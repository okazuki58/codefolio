import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// APIをキャッシュしない設定
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  req: Request,
  context: { params: Promise<{ resultId: string }> }
) {
  try {
    // パラメータを適切に処理 - 非同期パラメータの警告を解消
    const params = await context.params;
    const resultId = params.resultId;

    // セッション取得 - 認証チェック
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // ExamResultを検索（詳細情報を含む）
    const examResult = await prisma.examResult.findUnique({
      where: {
        id: resultId,
      },
      select: {
        id: true,
        userId: true,
        status: true,
        statusMessage: true,
        testsPassed: true,
        testsTotal: true,
        passPercentage: true,
        executionLog: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 結果が見つからない
    if (!examResult) {
      return NextResponse.json(
        { error: "結果が見つかりません" },
        { status: 404 }
      );
    }

    // 権限チェック - 自分の結果のみアクセス可能
    if (examResult.userId !== session.user.id) {
      return NextResponse.json(
        { error: "アクセス権限がありません" },
        { status: 403 }
      );
    }

    // キャッシュを防止するためのヘッダーを追加
    return NextResponse.json(examResult, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("詳細取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
