"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { BiArrowBack, BiLogOut } from "react-icons/bi";
import { Spinner } from "@/app/components/ui/spinner";

export default function SignOutPage() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/" });
  };

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

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            ログアウトの確認
          </h1>

          <p className="text-gray-600 text-center mb-8">
            本当にログアウトしますか？
          </p>

          <div className="space-y-4">
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSigningOut ? (
                <>
                  <Spinner color="white" size="md" />
                  <span>ログアウト中...</span>
                </>
              ) : (
                <>
                  <BiLogOut className="text-xl" />
                  <span>ログアウトする</span>
                </>
              )}
            </button>

            <Link
              href="/profile"
              className="block w-full text-center border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <BiArrowBack className="text-xl" />
              <span>キャンセル</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
