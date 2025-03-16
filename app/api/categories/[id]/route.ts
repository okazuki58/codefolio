import { NextResponse } from "next/server";
import { getCategoryById } from "@/lib/microcms";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await getCategoryById(params.id);
    
    if (!category) {
      return NextResponse.json({ error: "カテゴリが見つかりません" }, { status: 404 });
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