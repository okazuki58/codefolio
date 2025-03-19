import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  inviteUserToOrganization,
  getGitHubUserByProviderId,
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
        { error: "この機能は有料会員のみ利用できます" },
        { status: 403 }
      );
    }

    // GitHubアカウント情報を取得
    const githubAccount = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "github",
      },
    });

    if (!githubAccount) {
      return NextResponse.json(
        {
          error: "GitHubアカウントが連携されていません",
        },
        { status: 400 }
      );
    }

    console.log("GitHub Account Info:", {
      providerAccountId: githubAccount.providerAccountId,
      userId: githubAccount.userId,
    });

    try {
      // GitHubユーザー情報を取得
      const userData = await getGitHubUserByProviderId(
        githubAccount.providerAccountId
      );
      console.log("GitHub User Data:", userData);

      const githubUsername = userData.login;

      if (!githubUsername) {
        throw new Error("GitHubユーザー名が取得できませんでした");
      }

      console.log("Inviting user to organization:", {
        username: githubUsername,
        organization: process.env.GITHUB_ORGANIZATION,
      });

      // GitHub組織に招待
      await inviteUserToOrganization(githubUsername);

      return NextResponse.json({
        success: true,
        message: "GitHub組織への招待が送信されました。メールをご確認ください。",
      });
    } catch (githubError) {
      console.error("GitHub API error:", githubError);
      return NextResponse.json(
        {
          error: "GitHub APIとの通信中にエラーが発生しました",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("GitHub invitation error:", error);
    return NextResponse.json(
      {
        error: "招待処理中にエラーが発生しました",
      },
      { status: 500 }
    );
  }
}
