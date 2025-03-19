import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// いいね情報を取得
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get("contentId");

  if (!contentId) {
    return NextResponse.json(
      { error: "Content ID is required" },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ liked: false });
    }

    // データベースからいいね情報を取得
    const like = await prisma.like.findUnique({
      where: {
        userId_contentId: {
          userId,
          contentId,
        },
      },
    });

    return NextResponse.json({ liked: Boolean(like?.liked) });
  } catch (error) {
    console.error("Failed to get like status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// いいね情報を保存
export async function POST(request: Request) {
  try {
    const { contentId, liked } = await request.json();

    if (!contentId) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Upsert操作 - 存在すれば更新、なければ作成
    await prisma.like.upsert({
      where: {
        userId_contentId: {
          userId,
          contentId,
        },
      },
      update: {
        liked,
      },
      create: {
        userId,
        contentId,
        liked,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save like:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
