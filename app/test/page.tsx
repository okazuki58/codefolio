import Link from "next/link";
import { BiBookOpen, BiCheckCircle, BiTrophy } from "react-icons/bi";
import { getCategories } from "@/lib/microcms";
import { Metadata } from "next";
import { Category } from "@/types";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "理解度チェックテスト - カテゴリ一覧",
  description: "ブログの理解度をチェックするためのテスト一覧です",
};

export default async function TestCategoriesPage() {
  const { contents: categories } = await getCategories();
  const session = await auth();

  // ユーザーが完了したテストカテゴリのマップを作成
  let completedTests: Record<
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

    // カテゴリIDごとに最新のテスト結果を保持
    testResults.forEach((result) => {
      if (
        !completedTests[result.categoryId] ||
        result.createdAt > new Date(completedTests[result.categoryId].createdAt)
      ) {
        completedTests[result.categoryId] = {
          score: result.score,
          percentage: result.percentage,
          createdAt: result.createdAt,
        };
      }
    });
  }

  // levelフィールドに基づいてカテゴリをグループ分け
  const basicCategories = categories.filter((category: Category) =>
    category.level?.includes("基礎")
  );

  const advancedCategories = categories.filter((category: Category) =>
    category.level?.includes("発展")
  );

  // 「基礎」も「発展」も含まないカテゴリー
  const otherCategories = categories.filter(
    (category: Category) =>
      !category.level ||
      (!category.level.includes("基礎") && !category.level.includes("発展"))
  );

  // カテゴリーカードをレンダリングする共通関数
  const renderCategoryCard = (category: Category) => {
    const testResult = completedTests[category.id];
    const isCompleted = !!testResult;

    return (
      <Link
        key={category.id}
        href={`/test/category/${category.id}`}
        className={`bg-white rounded-xl border ${
          isCompleted
            ? "border-green-200 hover:border-green-300 hover:bg-green-50/30"
            : "border-gray-100 hover:border-blue-200 hover:bg-blue-50/30"
        } p-6 transition-all duration-300 flex items-center group`}
      >
        <div
          className={`p-3 rounded-full mr-4 ${
            isCompleted
              ? "bg-green-50 group-hover:bg-green-100"
              : "bg-blue-50 group-hover:bg-blue-100"
          } transition-colors`}
        >
          {isCompleted ? (
            <BiTrophy className="text-green-600 text-xl" />
          ) : (
            <BiCheckCircle className="text-blue-600 text-xl" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-gray-800">
              {category.name}
            </h2>
            {isCompleted && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                完了済み ({testResult.percentage}%)
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-1">
            {isCompleted
              ? `スコア: ${testResult.score} • 再挑戦する`
              : `${category.name}のテストを受ける`}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            理解度チェックテスト
          </h1>
          <div className="max-w-2xl mx-auto bg-blue-50 p-6 rounded-lg border border-blue-100">
            <p className="text-gray-700 leading-relaxed mb-3">
              知識の定着には、学んだことを確認するプロセスが不可欠です。これらのテストは
              <span className="text-blue-600 font-medium">
                あなたの理解度を確認する機会
              </span>
              であり、点数自体が目的ではありません。
            </p>
            <p className="text-gray-700 leading-relaxed">
              気軽にチャレンジして、自分の強みと改善点を発見しましょう。何度でも挑戦できます！
            </p>
          </div>
        </div>

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
                <div className="grid md:grid-cols-2 gap-5">
                  {basicCategories.map(renderCategoryCard)}
                </div>
              </div>
            )}

            {advancedCategories.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-purple-500 pl-3">
                  発展
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {advancedCategories.map(renderCategoryCard)}
                </div>
              </div>
            )}

            {otherCategories.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-gray-400 pl-3">
                  その他
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {otherCategories.map(renderCategoryCard)}
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
