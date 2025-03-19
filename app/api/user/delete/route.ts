import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import {
  getGitHubUserByProviderId,
  removeUserFromOrganization,
} from "@/lib/github";

export async function DELETE() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // 1. Stripeサブスクリプションの解約（存在する場合）
    if (user.stripeSubscriptionId) {
      try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
          apiVersion: "2025-02-24.acacia",
        });

        await stripe.subscriptions.cancel(user.stripeSubscriptionId);
        console.log(
          `Stripe subscription ${user.stripeSubscriptionId} cancelled`
        );
      } catch (stripeError) {
        console.error("Failed to cancel Stripe subscription:", stripeError);
        // エラーはログに残すが処理は続行
      }
    }

    // 2. GitHub組織からユーザーを削除（組織メンバーの場合）
    if (user.isGitHubOrgMember) {
      try {
        const githubAccount = user.accounts.find(
          (acc) => acc.provider === "github"
        );

        if (githubAccount) {
          const githubUser = await getGitHubUserByProviderId(
            githubAccount.providerAccountId
          );

          if (githubUser) {
            await removeUserFromOrganization(githubUser.login);
            console.log(
              `Removed user ${githubUser.login} from GitHub organization`
            );
          }
        }
      } catch (githubError) {
        console.error(
          "Failed to remove user from GitHub organization:",
          githubError
        );
        // エラーはログに残すが処理は続行
      }
    }

    // 3. データベースからユーザー関連データを削除
    await prisma.$transaction([
      // 関連するセッションを削除
      prisma.session.deleteMany({
        where: { userId },
      }),
      // 関連するアカウントを削除
      prisma.account.deleteMany({
        where: { userId },
      }),
      // ユーザーを削除
      prisma.user.delete({
        where: { id: userId },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "アカウントが正常に削除されました",
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "アカウント削除中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
