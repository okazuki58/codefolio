import { BiTimeFive } from "react-icons/bi";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function getTestResults() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  // Prismaからテスト結果を取得
  const testResults = await prisma.testResult.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 一意のカテゴリIDリストを作成
  const uniqueCategoryIds = [
    ...new Set(testResults.map((result) => result.categoryId)),
  ];

  // カテゴリごとの情報を取得
  const categoryMap: Record<string, string> = {};

  await Promise.all(
    uniqueCategoryIds.map(async (categoryId) => {
      try {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/categories/${categoryId}`,
          {
            next: { revalidate: 3600 }, // 1時間キャッシュ
          }
        );

        if (response.ok) {
          const category = await response.json();
          categoryMap[categoryId] = category.name;
        } else {
          categoryMap[categoryId] = "カテゴリ不明";
        }
      } catch (error) {
        console.error(`カテゴリ情報の取得に失敗 (ID: ${categoryId}):`, error);
        categoryMap[categoryId] = "カテゴリ不明";
      }
    })
  );

  // テスト結果とカテゴリ名を結合
  return testResults.map((result) => ({
    ...result,
    createdAt: result.createdAt.toISOString(), // Dateオブジェクトを文字列に変換
    categoryName: categoryMap[result.categoryId] || "カテゴリ不明",
  }));
}

export async function TestResults() {
  const testResults = await getTestResults();

  // テスト結果の統計
  const totalTests = testResults.length;
  const totalAnswers = testResults.reduce(
    (sum, result) => sum + result.total,
    0
  );
  const avgPercentage =
    totalTests > 0
      ? Math.round(
          testResults.reduce((sum, result) => sum + result.percentage, 0) /
            totalTests
        )
      : 0;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{totalTests}</div>
          <div className="text-sm text-gray-600 mt-1">完了したテスト</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{totalAnswers}</div>
          <div className="text-sm text-gray-600 mt-1">解いた問題</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">
            {avgPercentage}%
          </div>
          <div className="text-sm text-gray-600 mt-1">平均正答率</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50">
        {testResults.length > 0 ? (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              最近のテスト結果
            </h4>
            <div className="space-y-3">
              {testResults.slice(0, 5).map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-10 rounded-full ${
                        result.percentage >= 80
                          ? "bg-green-500"
                          : result.percentage >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <div className="font-medium">{result.categoryName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <BiTimeFive className="mr-1" />
                        {new Date(result.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {result.score}/{result.total}
                    </div>
                    <div className="text-sm text-gray-500">
                      {result.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href="/test"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                もっとテストに挑戦する
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-500 mb-3">
              まだテスト結果がありません
            </div>
            <Link
              href="/test"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              テストに挑戦する
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
