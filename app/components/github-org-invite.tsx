"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { BiGitBranch, BiLockAlt } from "react-icons/bi";

export default function GitHubOrgInvite() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // 有料会員でない場合は表示を変更
  if (!session?.user?.isPaidMember) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          GitHub開発リソース
        </h2>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center text-gray-600 mb-3">
            <BiLockAlt className="text-lg mr-2" />
            <p>有料会員限定の特典です</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            有料プランにアップグレードすると、開発リソースが含まれるGitHubリポジトリにアクセスできます。
          </p>
          <a
            href="/pricing"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
          >
            プランを見る
          </a>
        </div>
      </div>
    );
  }

  const handleInvite = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/github/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "招待処理に失敗しました");
      }

      setMessage({ text: data.message, type: "success" });
    } catch (error) {
      setMessage({
        text:
          error instanceof Error
            ? error.message
            : "招待処理中にエラーが発生しました",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        GitHub開発リソースへのアクセス
      </h2>

      <p className="text-gray-600 mb-4">
        有料会員特典として、開発リソースを含む非公開リポジトリにアクセスできます。
        下のボタンをクリックすると、あなたのGitHubアカウントを組織に招待します。
      </p>

      {message && (
        <div
          className={`p-3 rounded-md mb-4 ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        onClick={handleInvite}
        disabled={isLoading}
        className={`
          flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md
          hover:bg-blue-700 transition-colors
          ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
        `}
      >
        <BiGitBranch className="text-lg" />
        {isLoading ? "処理中..." : "GitHub組織に招待する"}
      </button>

      <p className="mt-4 text-xs text-gray-500">
        招待後、GitHubから届くメールを確認して招待を承認してください。
      </p>
    </div>
  );
}
