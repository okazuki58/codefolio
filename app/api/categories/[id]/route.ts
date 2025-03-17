import { NextResponse } from "next/server";
import { getCategoryById } from "@/lib/microcms";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = (await context.params);
    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { error: "カテゴリが見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("カテゴリ情報の取得中にエラーが発生しました:", error);
    return NextResponse.json(
      { error: "カテゴリ情報の取得に失敗しました" },
      { status: 500 }
    );
  }
}
