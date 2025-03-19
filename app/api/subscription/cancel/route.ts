import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

    // ユーザーのisPaidMemberをfalseに更新
    await prisma.user.update({
      where: { id: session.user.id },
      data: { isPaidMember: false },
    });

    // GitHubアカウント情報を取得
    const githubAccount = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "github",
      },
    });

    if (githubAccount) {
      try {
        // GitHubユーザー情報を取得
        const userData = await getGitHubUserByProviderId(
          githubAccount.providerAccountId
        );
        const githubUsername = userData.login;

        if (githubUsername) {
          // GitHub組織から削除
          await removeUserFromOrganization(githubUsername);
          console.log(`ユーザー ${githubUsername} を組織から削除しました`);
        }
      } catch (githubError) {
        console.error("GitHub organization removal error:", githubError);
        // GitHub関連のエラーはログに残すが処理は続行
      }
    }

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
