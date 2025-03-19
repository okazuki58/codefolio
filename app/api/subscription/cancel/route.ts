import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import {
  getGitHubUserByProviderId,
  removeUserFromOrganization,
} from "@/lib/github";

export async function POST() {
  try {
    // セッションから認証情報を取得
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // 有料会員かどうかチェック
    if (!session.user.isPaidMember) {
      return NextResponse.json(
        { error: "現在有料会員ではありません" },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Stripeでのサブスクリプションをキャンセルするためのロジック
    if (user?.stripeSubscriptionId) {
      try {
        // Stripeサブスクリプションを解約
        await stripe.subscriptions.cancel(user.stripeSubscriptionId);
        console.log(
          `Stripeサブスクリプション ${user.stripeSubscriptionId} を解約しました`
        );
      } catch (stripeError) {
        console.error("Stripe subscription cancellation error:", stripeError);
        // Stripe関連のエラーはログに残すが処理は続行
      }
    }

    // GitHubアカウント情報を取得
    const githubAccount = await prisma.account.findFirst({
      where: {
        userId: userId,
        provider: "github",
      },
    });

    // GitHubアカウントがある場合は組織から削除
    if (githubAccount) {
      try {
        const githubUser = await getGitHubUserByProviderId(
          githubAccount.providerAccountId
        );

        if (githubUser) {
          // GitHubユーザーが存在する場合、組織から削除
          await removeUserFromOrganization(githubUser.login);

          // GitHub組織メンバーステータスを更新
          await prisma.user.update({
            where: { id: userId },
            data: { isGitHubOrgMember: false },
          });

          console.log(`ユーザー ${userId} をGitHub組織から削除しました`);
        }
      } catch (githubError) {
        console.error("GitHub organization removal error:", githubError);
        // GitHub関連のエラーはログに残すが処理は続行
      }
    }

    // ユーザーのisPaidMemberをfalseに更新
    await prisma.user.update({
      where: { id: userId },
      data: {
        isPaidMember: false,
        // サブスクリプションIDは一旦保持（履歴のために）
      },
    });

    return NextResponse.json({
      success: true,
      message: "サブスクリプションが正常に解約されました。",
    });
  } catch (error) {
    console.error("Subscription cancellation error:", error);
    return NextResponse.json(
      {
        error: "解約処理中にエラーが発生しました。",
      },
      { status: 500 }
    );
  }
}
