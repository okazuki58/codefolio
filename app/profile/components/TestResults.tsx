"use client";

import { useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import Link from "next/link";

interface TestResult {
  id: string;
  userId: string;
  categoryId: string;
  score: number;
  total: number;
  percentage: number;
  createdAt: string;
}

interface EnrichedTestResult extends TestResult {
  categoryName: string;
}

// APIからカテゴリ情報を取得する関数
async function fetchCategoryInfo(categoryId: string) {
  try {
    const response = await fetch(`/api/categories/${categoryId}`);
    if (!response.ok) {
      throw new Error(`カテゴリ情報の取得に失敗しました: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`カテゴリID ${categoryId} の取得に失敗:`, error);
    return null;
  }
}

export function TestResults() {
  const [testResults, setTestResults] = useState<EnrichedTestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    async function fetchTestResults() {
      try {
        // 1. API からテスト結果を取得
        const response = await fetch("/api/test-results");
        if (!response.ok) {
          throw new Error("テスト結果の取得に失敗しました");
        }

        const data: TestResult[] = await response.json();

        // 2. 一意のカテゴリIDリストを作成して重複リクエストを防ぐ
        const uniqueCategoryIds = [
          ...new Set(data.map((result) => result.categoryId)),
        ];

        // 3. カテゴリIDごとに一度だけAPIからカテゴリ情報を取得
        const categoryMap: Record<string, string> = {};

        for (const categoryId of uniqueCategoryIds) {
          try {
            const category = await fetchCategoryInfo(categoryId);
            categoryMap[categoryId] = category?.name || "カテゴリ不明";
          } catch (err) {
            console.error(`カテゴリ情報の取得に失敗 (ID: ${categoryId}):`, err);
            categoryMap[categoryId] = "カテゴリ不明";
          }
        }

        // 4. テスト結果とカテゴリ名を結合
        const enrichedResults = data.map((result) => ({
          ...result,
          categoryName: categoryMap[result.categoryId] || "カテゴリ不明",
        }));

        setTestResults(enrichedResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
        console.error("テスト結果の取得中にエラーが発生しました:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestResults();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse">データを読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">エラー: {error}</div>;
  }

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
