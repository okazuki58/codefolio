import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { categoryId, score, total, percentage, userId } = await req.json();

    // クライアントから送信されたユーザーIDを使用（認証バックアップ）
    const authenticatedUserId = session?.user?.id || userId;

    if (!authenticatedUserId) {
      console.log("認証エラー: セッションまたはユーザーIDが見つかりません");
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    if (
      !categoryId ||
      score === undefined ||
      total === undefined ||
      percentage === undefined
    ) {
      return NextResponse.json(
        { error: "必要なデータが不足しています" },
        { status: 400 }
      );
    }

    // テスト結果を保存
    const testResult = await prisma.testResult.create({
      data: {
        userId: authenticatedUserId,
        categoryId,
        score,
        total,
        percentage,
      },
    });

    return NextResponse.json(testResult);
  } catch (error) {
    console.error("テスト結果の保存中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "テスト結果の保存に失敗しました" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const where: { userId: string; categoryId?: string } = {
      userId: session.user.id,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const testResults = await prisma.testResult.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testResults);
  } catch (error) {
    console.error("テスト結果の取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "テスト結果の取得に失敗しました" },
      { status: 500 }
    );
  }
}
