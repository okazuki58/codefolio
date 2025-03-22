"use server";

import { auth } from "@/lib/auth";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCategories as getMicroCMSCategories } from "@/lib/microcms";

// 型定義
interface Category {
  id: string;
  name: string;
}

interface TestResult {
  id: string;
  score: number;
  total: number;
  percentage: number;
  categoryId: string;
  createdAt: Date;
}

// Profile data preloader - this allows us to prefetch required data in parallel
export const preloadProfileData = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  // Prefetch categories and user data in parallel
  await Promise.all([getCategories(), getUserTestResults(session.user.id)]);

  return true;
};

// Reusable function to get categories with caching
export const getCategories = unstable_cache(
  async () => {
    try {
      // MicroCMSから直接カテゴリを取得
      const categoriesData = await getMicroCMSCategories();

      // カテゴリIDとカテゴリ名のマッピングを作成
      return categoriesData.contents.reduce(
        (acc: Record<string, string>, category: Category) => {
          acc[category.id] = category.name;
          return acc;
        },
        {}
      );
    } catch (error) {
      console.error("カテゴリ情報の取得に失敗:", error);
      return {};
    }
  },
  ["categories-cache"],
  { revalidate: 3600 } // 1時間キャッシュ
);

// Get user test results with caching
export const getUserTestResults = unstable_cache(
  async (
    userId: string
  ): Promise<
    Array<
      | TestResult
      | {
          id: string;
          score: number;
          total: number;
          percentage: number;
          categoryId: string;
          createdAt: string;
        }
    >
  > => {
    if (!userId) return [];

    const results = await prisma.testResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        score: true,
        total: true,
        percentage: true,
        categoryId: true,
        createdAt: true,
      },
    });

    // PrismaからのJSONシリアライズの問題を回避するために日付を事前に処理
    return results.map((result) => ({
      ...result,
      // createdAtがDateオブジェクトの場合はISOString形式に変換（Prismaの仕様上、日付型がオブジェクトとして返ることがある）
      createdAt:
        result.createdAt instanceof Date
          ? result.createdAt.toISOString()
          : result.createdAt,
    }));
  },
  ["user-test-results"],
  { revalidate: 60 } // 1分キャッシュ
);
