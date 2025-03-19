"use client";

import Link from "next/link";
import Image from "next/image";
import { BiHome, BiInfoCircle } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "認証中にエラーが発生しました。";

  // エラーメッセージをカスタマイズ
  switch (error) {
    case "AccessDenied":
      errorMessage =
        "アクセスが拒否されました。権限が不足している可能性があります。";
      break;
    case "Configuration":
      errorMessage = "認証設定に問題があります。管理者にお問い合わせください。";
      break;
    case "OAuthCallback":
      errorMessage =
        "認証プロバイダからのコールバック中にエラーが発生しました。";
      break;
    case "OAuthSignin":
      errorMessage = "認証プロバイダへのサインイン中にエラーが発生しました。";
      break;
    case "OAuthAccountNotLinked":
      errorMessage =
        "このメールアドレスは既に別のアカウントで使用されています。";
      break;
    case "Verification":
      errorMessage = "検証トークンが無効または期限切れです。";
      break;
    default:
      break;
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
      <div className="flex items-start">
        <BiInfoCircle className="text-red-500 text-xl mr-3 mt-0.5" />
        <div>
          <h3 className="text-red-800 font-medium">認証エラー</h3>
          <p className="text-red-700 mt-1">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16">
              <Image
                src="/codefolio-logo-only.svg"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <Suspense
            fallback={
              <div className="bg-gray-50 p-4 rounded animate-pulse mb-6">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            }
          >
            <ErrorContent />
          </Suspense>

          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              ログインページに戻る
            </Link>

            <Link
              href="/"
              className="block w-full text-center border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <BiHome className="text-xl" />
              <span>ホームに戻る</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
