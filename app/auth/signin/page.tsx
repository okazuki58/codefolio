"use client";

import { signIn } from "next-auth/react";
import {
  BiLogoGithub,
  BiInfoCircle,
  BiCodeAlt,
  BiBookAlt,
  BiLaptop,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Spinner } from "@/app/components/ui/spinner";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    await signIn("github", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex flex-col md:flex-row bg-white">
      {/* 左側のブランドエリア - モバイルでは非表示 */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center p-8 md:p-16 bg-blue-600 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <div className="relative h-[40px] w-[40px] mr-4">
              <Image
                src="/codefolio-logo-only.svg"
                alt="Codefolio Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold">codefolio</h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            プログラミング学習を
            <br />
            次のレベルへ
          </h2>

          <p className="text-blue-100 mb-8">
            コードを書き、理解し、共有することでプログラミングスキルを効率的に向上させましょう。
          </p>

          <div className="space-y-5">
            <div className="flex items-start">
              <div className="bg-white/10 p-2 rounded mr-4">
                <BiCodeAlt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">実践的なコード演習</h3>
                <p className="text-sm text-blue-100">
                  実際のプロジェクトに基づいた演習問題で実戦的なスキルを身につけます
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white/10 p-2 rounded mr-4">
                <BiBookAlt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">包括的な学習コンテンツ</h3>
                <p className="text-sm text-blue-100">
                  基礎から応用まで、段階的に学べる教材を用意しています
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white/10 p-2 rounded mr-4">
                <BiLaptop className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">プロジェクト管理</h3>
                <p className="text-sm text-blue-100">
                  GitHubと連携したプロジェクト管理で実践的な開発経験を積めます
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右側のログインエリア */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-[calc(100vh-70px)] p-0 md:p-8 bg-gray-50 bg-white">
        <div className="w-full max-w-md space-y-6 bg-white p-6 md:p-8 rounded-lg md:border md:border-gray-100">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              アカウントにログイン
            </h2>
            <p className="mt-2 text-gray-600">学習を再開しましょう</p>
          </div>

          <button
            onClick={handleGitHubSignIn}
            disabled={isLoading}
            className={`flex w-full justify-center items-center gap-2 rounded-md bg-gray-800 py-3 px-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-150 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <Spinner color="white" size="md" />
            ) : (
              <BiLogoGithub className="h-5 w-5" />
            )}
            <span>{isLoading ? "ログイン中..." : "GitHubでログイン"}</span>
          </button>

          <div className="bg-blue-50 rounded p-4 border-l-3 border-blue-500">
            <div className="flex">
              <div className="flex-shrink-0 mt-0.5">
                <BiInfoCircle
                  className="h-4 w-4 text-blue-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-700">
                  GitHubアカウントをお持ちでない方へ
                </h3>
                <div className="mt-2 text-sm text-blue-600">
                  <p>
                    当サービスはGitHubアカウントを使用してログインします。GitHubアカウントをお持ちでない場合は、以下のリンクから無料で作成できます。
                  </p>
                  <div className="mt-3">
                    <Link
                      href="https://github.com/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                    >
                      GitHubアカウントを作成する
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>
              ログインすることで、
              <Link
                href="/terms"
                className="font-medium text-blue-500 hover:text-blue-600"
              >
                利用規約
              </Link>
              と
              <Link
                href="/privacy"
                className="font-medium text-blue-500 hover:text-blue-600"
              >
                プライバシーポリシー
              </Link>
              に同意したことになります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
