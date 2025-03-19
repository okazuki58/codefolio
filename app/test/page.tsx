import Link from "next/link";
import { BiBookOpen, BiCheckCircle, BiTrophy } from "react-icons/bi";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCategories } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "理解度チェックテスト - カテゴリ一覧",
  description: "ブログの理解度をチェックするためのテスト一覧です",
};

interface CategoryData {
  id: string;
  name: string;
  level?: string | string[];
}

export default async function TestCategoriesPage() {
  const session = await auth();

  // CMSからカテゴリデータのみ取得
  const { contents: categories } = await getCategories();

  // ユーザーが完了したテストの情報
  const completedTests: Record<
    string,
    { score: number; percentage: number; createdAt: Date }
  > = {};

  // ログインしている場合、ユーザーのテスト結果を取得
  if (session?.user?.id) {
    const testResults = await prisma.testResult.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 結果をカテゴリIDごとに整理
    testResults.forEach((result) => {
      const categoryKey = result.categoryId;

      if (
        !completedTests[categoryKey] ||
        result.createdAt > new Date(completedTests[categoryKey].createdAt)
      ) {
        completedTests[categoryKey] = {
          score: result.score,
          percentage: result.percentage,
          createdAt: result.createdAt,
        };
      }
    });
  }

  // カテゴリをレベル別に分類
  const basicCategories = categories
    .filter((category) => category.level?.includes("基礎"))
    .sort((a, b) => {
      // indexがない場合は大きな値を設定
      const indexA = a.index ?? 999;
      const indexB = b.index ?? 999;
      return indexA - indexB;
    });

  const advancedCategories = categories
    .filter((category) => category.level?.includes("発展"))
    .sort((a, b) => {
      // indexがない場合は大きな値を設定
      const indexA = a.index ?? 999;
      const indexB = b.index ?? 999;
      return indexA - indexB;
    });

  const otherCategories = categories.filter(
    (category) =>
      !category.level ||
      (!category.level.includes("基礎") && !category.level.includes("発展"))
  );

  // カテゴリーカードをレンダリングする関数
  const renderCategoryCard = (category: CategoryData) => {
    const testResult = completedTests[category.id];
    const isCompleted = !!testResult;

    return (
      <Link
        key={category.id}
        href={`/test/category/${category.id}`}
        className={`bg-white rounded-xl border shadow-sm ${
          isCompleted
            ? "border-green-300 hover:border-green-400 hover:bg-green-50/50"
            : "border-blue-200 hover:border-blue-300 hover:bg-blue-50/50"
        } p-5 transition-all duration-300 flex flex-col items-start group w-full overflow-hidden hover:shadow-lg transform hover:-translate-y-3`}
      >
        <div className="w-full flex items-center">
          <div
            className={`p-3 rounded-full mr-3 flex-shrink-0 ${
              isCompleted
                ? "bg-green-100 group-hover:bg-green-200"
                : "bg-blue-100 group-hover:bg-blue-200"
            } transition-colors`}
          >
            {isCompleted ? (
              <BiTrophy className="text-green-600 text-xl" />
            ) : (
              <BiCheckCircle className="text-blue-600 text-xl" />
            )}
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex justify-between items-start gap-2">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {category.name}
              </h2>
              {isCompleted && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap flex-shrink-0 border border-green-200">
                  <span className="md:hidden">完了</span>
                  <span className="hidden md:inline">
                    完了済み ({testResult.percentage}%)
                  </span>
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1 truncate font-medium">
              {isCompleted
                ? `スコア: ${testResult.score} • 再挑戦する`
                : `${category.name}のテストを受ける`}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-[calc(100vh-70px)] container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">理解度チェックテスト</h1>

        {categories.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center max-w-md mx-auto border border-gray-100">
            <BiCheckCircle className="text-gray-300 text-5xl mx-auto mb-4" />
            <p className="text-gray-500">
              テストカテゴリが見つかりませんでした
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {basicCategories.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  基礎
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {basicCategories.map((category) =>
                    renderCategoryCard({
                      id: category.id,
                      name: category.name,
                      level: category.level,
                    })
                  )}
                </div>
              </div>
            )}

            {advancedCategories.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-purple-500 pl-3">
                  発展
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {advancedCategories.map((category) =>
                    renderCategoryCard({
                      id: category.id,
                      name: category.name,
                      level: category.level,
                    })
                  )}
                </div>
              </div>
            )}

            {otherCategories.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-gray-400 pl-3">
                  その他
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {otherCategories.map((category) =>
                    renderCategoryCard({
                      id: category.id,
                      name: category.name,
                      level: category.level,
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <BiBookOpen className="mr-2" />
            学習ドキュメントに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
