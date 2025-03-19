"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMenu, BiLogoGithub } from "react-icons/bi";
import { Session } from "next-auth";
import { UserButton } from "./user-button";

interface NavigationProps {
  session: Session | null;
}

export function Navigation({ session }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      <Link
        href="/"
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hidden sm:block ${
          isActive("/")
            ? "text-blue-600 bg-blue-50"
            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`}
      >
        ホーム
      </Link>

      <Link
        href="/pricing"
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hidden sm:block ${
          isActive("/pricing")
            ? "text-blue-600 bg-blue-50"
            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`}
      >
        料金プラン
      </Link>

      <Link
        href="/blog"
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hidden sm:block ${
          isActive("/blog")
            ? "text-blue-600 bg-blue-50"
            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`}
      >
        学習ドキュメント
      </Link>

      <Link
        href="/test"
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hidden sm:block ${
          isActive("/test")
            ? "text-blue-600 bg-blue-50"
            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`}
      >
        理解度テスト
      </Link>

      <Link
        href="/exams"
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hidden sm:block ${
          isActive("/exams")
            ? "text-blue-600 bg-blue-50"
            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`}
      >
        演習問題
      </Link>

      <div className="flex items-center gap-2 ml-4">
        {session ? (
          <UserButton session={session} />
        ) : (
          <Link
            href="/api/auth/signin"
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <BiLogoGithub className="text-lg" />
            <span>GitHub ログイン</span>
          </Link>
        )}

        <button
          className="block sm:hidden w-[36px] h-[36px] rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
          aria-label="メインメニュー"
        >
          <BiMenu className="text-xl" />
        </button>
      </div>
    </nav>
  );
}
