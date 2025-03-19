import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import {
  getGitHubUserByProviderId,
  inviteUserToOrganization,
} from "@/lib/github";

// このエンドポイントはStripe Webhookからのリクエストを処理するため、CSRF保護を無効化
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function updateUserSubscriptionStatus(userId: string, isPaid: boolean) {
  // ユーザーの有料会員ステータスを更新
  await prisma.user.update({
    where: { id: userId },
    data: { isPaidMember: isPaid },
  });

  // 有料会員になった場合はGitHub組織に招待
  if (isPaid) {
    try {
      // GitHubアカウント情報を取得
      const githubAccount = await prisma.account.findFirst({
        where: {
          userId: userId,
          provider: "github",
        },
      });

      if (githubAccount) {
        // GitHubユーザー情報を取得
        const userData = await getGitHubUserByProviderId(
          githubAccount.providerAccountId
        );
        const githubUsername = userData.login;

        if (githubUsername) {
          // GitHub組織に招待
          await inviteUserToOrganization(githubUsername);
          console.log(`ユーザー ${githubUsername} を組織に招待しました`);
        }
      }
    } catch (githubError) {
      console.error("GitHub organization invitation error:", githubError);
      // GitHub関連のエラーはログに残すが処理は続行
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers(); // Next.js 15では、headers()はPromiseを返すので、awaitする必要があります
  const signature = headersList.get("Stripe-Signature") as string;

  let event;

  try {
    // Stripeイベントの署名を検証
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  // イベントの種類に応じて処理
  switch (event.type) {
    // チェックアウト完了時
    case "checkout.session.completed":
      if (session.mode === "subscription" && session.subscription) {
        const userId = session.client_reference_id;

        if (userId) {
          // ユーザーを有料会員に更新
          await updateUserSubscriptionStatus(userId, true);

          // StripeのサブスクリプションIDをユーザーに紐付け
          await prisma.user.update({
            where: { id: userId },
            data: { stripeSubscriptionId: session.subscription },
          });

          console.log(`ユーザー ${userId} のサブスクリプションを開始しました`);
        }
      }
      break;

    // サブスクリプション更新時
    case "customer.subscription.updated":
      const subscriptionId = session.id;
      const status = session.status;

      // サブスクリプションステータスが「アクティブ」でない場合
      const isActiveSubscription = status === "active" || status === "trialing";

      // このサブスクリプションに関連するユーザーを検索
      const user = await prisma.user.findFirst({
        where: { stripeSubscriptionId: subscriptionId },
      });

      if (user) {
        // ユーザーの有料会員ステータスを更新
        await updateUserSubscriptionStatus(user.id, isActiveSubscription);
        console.log(
          `ユーザー ${user.id} のサブスクリプションステータスを ${status} に更新しました`
        );
      }
      break;

    // サブスクリプションキャンセル時
    case "customer.subscription.deleted":
      const deletedSubscriptionId = session.id;

      // このサブスクリプションに関連するユーザーを検索
      const subscribedUser = await prisma.user.findFirst({
        where: { stripeSubscriptionId: deletedSubscriptionId },
      });

      if (subscribedUser) {
        // ユーザーの有料会員ステータスを解除
        await updateUserSubscriptionStatus(subscribedUser.id, false);
        console.log(
          `ユーザー ${subscribedUser.id} のサブスクリプションを解除しました`
        );
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
