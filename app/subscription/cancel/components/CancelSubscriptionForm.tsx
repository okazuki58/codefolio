"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiCheckbox, BiCheckboxChecked, BiArrowBack } from "react-icons/bi";

export default function CancelSubscriptionForm() {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    if (!isConfirmed) {
      setError("解約を確定するには確認事項に同意してください");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "解約処理に失敗しました");
      }

      // 成功時は設定ページへリダイレクト
      router.push("/settings?message=subscription-cancelled");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "解約処理中にエラーが発生しました"
      );
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="flex items-start gap-3 p-4 rounded-md bg-gray-50 mb-6 cursor-pointer"
        onClick={() => setIsConfirmed(!isConfirmed)}
      >
        <div className="text-xl text-gray-700 mt-0.5">
          {isConfirmed ? <BiCheckboxChecked /> : <BiCheckbox />}
        </div>
        <p className="text-gray-700">
          解約すると有料会員特典が無効になり、プライベートリポジトリへのアクセスができなくなることを理解しました。
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-md mb-4 bg-red-50 text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push("/settings")}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <BiArrowBack />
          キャンセル
        </button>

        <button
          onClick={handleCancel}
          disabled={isLoading || !isConfirmed}
          className={`
            flex-1 bg-red-600 text-white py-2 px-4 rounded-md
            hover:bg-red-700 transition-colors
            ${isLoading || !isConfirmed ? "opacity-60 cursor-not-allowed" : ""}
          `}
        >
          {isLoading ? "処理中..." : "サブスクリプションを解約する"}
        </button>
      </div>
    </div>
  );
}
