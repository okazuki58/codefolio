"use client";

import { useState, useTransition, useEffect } from "react";
import { BiLoaderCircle, BiCheckCircle } from "react-icons/bi";
import { submitExam } from "./actions";
import { useRouter } from "next/navigation";

interface SubmitFormProps {
  slug: string;
}

// Server Actionからの戻り値の型を定義
interface SubmitResult {
  success: boolean;
  resultId: string;
  slug: string;
}

export function SubmitForm({ slug }: SubmitFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [, startTransition] = useTransition();

  // アニメーション用の状態
  const [showModal, setShowModal] = useState(false);
  const [processingStep, setProcessingStep] = useState<"loading" | "success">(
    "loading"
  );
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // モーダル表示/非表示の制御
  useEffect(() => {
    if (isSubmitting) {
      setShowModal(true);
      setProcessingStep("loading");
      setFadeOut(false);
      // 表示時にフェードイン効果を追加
      setFadeIn(false);
      setTimeout(() => {
        setFadeIn(true);
      }, 50);
    }
  }, [isSubmitting]);

  // プロセスステップを進める関数
  const advanceProcessingStep = () => {
    if (processingStep === "loading") {
      setProcessingStep("success");
      // successステップを2秒表示してからフェードアウト
      setTimeout(() => {
        setFadeOut(true);
        // フェードアウト後にモーダルを非表示
        setTimeout(() => {
          setShowModal(false);
        }, 500);
      }, 2000);
    }
  };

  // フォーム送信前にローディング状態に切り替える
  function handleClick() {
    setIsSubmitting(true);
  }

  async function handleSubmit(formData: FormData) {
    try {
      setError(null);

      // Server Actionを呼び出し - 戻り値を明示的に型付け
      startTransition(async () => {
        try {
          const result = (await submitExam(formData)) as SubmitResult;

          // テスト完了を示すアニメーションを開始
          advanceProcessingStep();

          // Server Actionが成功した場合、結果ページにクライアント側でリダイレクト
          // アニメーション完了後にリダイレクト
          if (result && result.success && result.resultId) {
            setTimeout(() => {
              router.push(`/exams/${slug}/results/${result.resultId}`);
            }, 2500); // successステップ表示時間 + フェードアウト時間
            return;
          }

          // resultが無効な場合（通常はリダイレクトされるため実行されない）
          setIsSubmitting(false);
          setShowModal(false);
          setError(
            "提出は成功しましたが、結果ページへの移動に失敗しました。ブラウザを更新してください。"
          );
        } catch (error) {
          setIsSubmitting(false);
          setShowModal(false);
          // NEXT_REDIRECTエラーはRouterが発生するもので無視する
          if (
            error instanceof Error &&
            error.message.includes("NEXT_REDIRECT")
          ) {
            console.log("リダイレクト中...");
            return;
          }

          console.error("提出エラー:", error);
          setError(
            "提出に失敗しました: " +
              (error instanceof Error ? error.message : String(error))
          );
        }
      });
    } catch (error) {
      setIsSubmitting(false);
      setShowModal(false);
      console.error("フォーム提出エラー:", error);
      setError(
        "提出に失敗しました: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }

  return (
    <div className="relative">
      {/* アニメーション付きモーダル */}
      {showModal && (
        <div
          className={`fixed inset-0 bg-gray-800/70 z-50 flex flex-col items-center justify-center
                     transition-opacity duration-500 ease-in-out
                     ${
                       fadeOut
                         ? "opacity-0"
                         : fadeIn
                         ? "opacity-100"
                         : "opacity-0"
                     }`}
        >
          <div
            className={`bg-white p-8 rounded-lg max-w-md w-full text-center shadow-xl
                       transition-all duration-500 ease-in-out
                       ${
                         fadeOut
                           ? "opacity-0 transform -translate-y-4"
                           : fadeIn
                           ? "opacity-100 transform translate-y-0"
                           : "opacity-0 transform translate-y-4"
                       }`}
          >
            <div className="h-20 flex items-center justify-center">
              {processingStep === "loading" && (
                <BiLoaderCircle className="animate-spin h-16 w-16 text-blue-600" />
              )}

              {processingStep === "success" && (
                <div className="text-green-500 transform transition-all duration-500 ease-in-out animate-scale-in">
                  <BiCheckCircle className="h-16 w-16" />
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold mt-4 mb-2">
              {processingStep === "loading" && "採点中..."}
              {processingStep === "success" && "採点完了"}
            </h3>

            <p className="text-gray-600">
              {processingStep === "loading" && (
                <>
                  テストを実行して結果を確認しています。
                  <br />
                  このプロセスは30秒程度かかる場合があります。
                </>
              )}
              {processingStep === "success" && (
                <>テストの実行が完了しました。</>
              )}
            </p>
          </div>
        </div>
      )}

      <form className="space-y-4" action={handleSubmit} onSubmit={handleClick}>
        <input type="hidden" name="slug" value={slug} />
        <div>
          <label
            htmlFor="repositoryUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GitHubリポジトリURL *
          </label>
          <input
            type="url"
            id="repositoryUrl"
            name="repositoryUrl"
            placeholder="https://github.com/username/repository"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded font-medium text-base hover:bg-blue-700 transition-colors flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <BiLoaderCircle className="animate-spin mr-2" />
              提出中...
            </>
          ) : (
            "演習を提出する"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
