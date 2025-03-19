"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiTrash } from "react-icons/bi";

export function DeleteAccountButton() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 削除成功後、ログアウト状態でホームページに遷移
        router.push("/?deleted=true");
      } else {
        console.error("Account deletion failed:", data.error);
        setIsDeleting(false);
        setShowConfirmation(false);
        alert(`アカウント削除に失敗しました: ${data.error || "不明なエラー"}`);
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
      setIsDeleting(false);
      setShowConfirmation(false);
      alert("アカウント削除中にエラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center gap-2"
        disabled={isDeleting}
      >
        <BiTrash className="text-lg" />
        <span>{isDeleting ? "処理中..." : "削除"}</span>
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-red-600 mb-2">
              アカウント削除の確認
            </h3>
            <p className="text-gray-700 mb-4">
              本当にアカウントを削除しますか？この操作は取り消せません。
            </p>
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                disabled={isDeleting}
              >
                キャンセル
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>削除中...</span>
                  </>
                ) : (
                  <>
                    <BiTrash />
                    <span>削除する</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
