"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { BiCheckCircle, BiXCircle, BiLoaderCircle } from "react-icons/bi";

interface ExamResult {
  id: string;
  status: string;
  statusMessage?: string;
  testsPassed?: number;
  testsTotal?: number;
  passPercentage?: number;
  executionLog?: string;
  updatedAt: string;
}

interface ResultDisplayProps {
  resultId: string;
  initialData: ExamResult;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ResultDisplay({ resultId, initialData }: ResultDisplayProps) {
  // 前回の更新時刻を追跡して不要なレンダリングを防止
  const [lastUpdated, setLastUpdated] = useState<string>(initialData.updatedAt);

  // 完了状態かどうかをチェック（ポーリング制御用）
  const isCompleted =
    initialData.status === "completed" || initialData.status === "failed";
  const [shouldPoll, setShouldPoll] = useState<boolean>(!isCompleted);

  // SWRを使用してデータをポーリング
  const { data, error } = useSWR<ExamResult>(
    `/api/exam-results/${resultId}/poll`,
    fetcher,
    {
      // 完了または失敗時にはポーリングを停止
      refreshInterval: shouldPoll ? 2000 : 0, // 必要な場合のみポーリング
      revalidateOnFocus: shouldPoll,
      dedupingInterval: 1000,
      fallbackData: initialData,
    }
  );

  // データが更新されたかチェック
  useEffect(() => {
    if (data && data.updatedAt !== lastUpdated) {
      console.log("データが更新されました", {
        old: new Date(lastUpdated),
        new: new Date(data.updatedAt),
      });
      setLastUpdated(data.updatedAt);

      // 完了または失敗したらポーリングを停止
      if (data.status === "completed" || data.status === "failed") {
        setShouldPoll(false);
      }
    }
  }, [data, lastUpdated]);

  if (error) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-amber-700">
        <div className="flex items-center gap-2">
          <BiXCircle className="h-6 w-6" />
          <span>ステータス取得エラー</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-50 border-l-4 border-gray-300 p-3">
        <div className="flex items-center gap-2 text-gray-500">
          <BiLoaderCircle className="animate-spin h-6 w-6" />
          <span>データ読み込み中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ステータス表示セクション - テスト結果に基づいて色を変更 */}
      <div
        className={`p-4 ${
          data.status === "completed" &&
          data.testsPassed !== undefined &&
          data.testsTotal !== undefined &&
          data.testsPassed === data.testsTotal &&
          data.testsPassed > 0
            ? "bg-green-50 border-l-4 border-green-500" // 全問正解の場合は緑
            : data.status === "completed"
            ? "bg-red-50 border-l-4 border-red-500" // 完了だが全問正解でない（不合格）
            : data.status === "failed"
            ? "bg-red-50 border-l-4 border-red-500" // 失敗
            : "bg-white border-l-4 border-blue-500" // それ以外（準備中など）
        }`}
      >
        <StatusDisplay
          status={data.status}
          message={data.statusMessage}
          testsPassed={data.testsPassed}
          testsTotal={data.testsTotal}
        />
      </div>

      {/* テスト結果セクション */}
      {(data.status === "completed" ||
        data.status === "failed" ||
        (data.testsPassed !== undefined && data.testsTotal !== undefined)) && (
        <div className="bg-white">
          <h2 className="text-lg font-semibold mb-4">テスト結果</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-gray-50 p-4">
              <p className="text-gray-600">成功したテスト:</p>
              <p className="text-xl font-semibold text-green-600">
                {data.testsPassed} / {data.testsTotal}
              </p>
            </div>
            <div className="flex-1 bg-gray-50 p-4">
              <p className="text-gray-600">合格率:</p>
              <div className="flex items-center">
                <p className="text-xl font-semibold text-blue-600 mr-2">
                  {data.passPercentage?.toFixed(1)}%
                </p>
                {data.testsPassed !== undefined &&
                data.testsTotal !== undefined &&
                data.testsPassed === data.testsTotal &&
                data.testsTotal > 0 ? (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    全問正解
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* 合格した場合のみメッセージを表示 */}
          {data.testsPassed !== undefined &&
            data.testsTotal !== undefined &&
            data.testsPassed === data.testsTotal &&
            data.testsTotal > 0 && (
              <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500">
                <p className="font-medium">全てのテストに合格しました！</p>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

function StatusDisplay({
  status,
  message,
  testsPassed,
  testsTotal,
}: {
  status: string;
  message?: string;
  testsPassed?: number;
  testsTotal?: number;
}) {
  // テスト結果に基づく合格/不合格判定
  const isPassed =
    testsPassed !== undefined &&
    testsPassed > 0 &&
    testsTotal !== undefined &&
    testsPassed === testsTotal;

  switch (status) {
    case "pending":
      return (
        <div className="flex items-center gap-2 text-blue-600">
          <BiLoaderCircle className="animate-spin h-6 w-6" />
          <span>テスト実行の準備中...</span>
        </div>
      );
    case "processing":
      return (
        <div className="flex items-center gap-2 text-blue-600">
          <BiLoaderCircle className="animate-spin h-6 w-6" />
          <span>{message || "テスト実行中..."}</span>
        </div>
      );
    case "completed":
      return (
        <div
          className={`flex items-center gap-2 ${
            isPassed ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPassed ? (
            <BiCheckCircle className="h-6 w-6" />
          ) : (
            <BiXCircle className="h-6 w-6" />
          )}
          <span>{isPassed ? "合格" : "不合格"}</span>
        </div>
      );
    case "failed":
      return (
        <div className="flex items-center gap-2 text-red-600">
          <BiXCircle className="h-6 w-6" />
          <span>不合格</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2 text-gray-600">
          <span>ステータス: {status}</span>
        </div>
      );
  }
}
