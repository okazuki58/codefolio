import Link from "next/link";
import Image from "next/image";
import { BiMenu } from "react-icons/bi";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UserButton } from "./user-button";

export default async function Header() {
  const session = await auth();
  const headersList = headers();
  const pathname = (await headersList).get("x-pathname") || "/";

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="h-[70px] sticky top-0 border-b border-gray-100 flex items-center px-4 sm:px-6 md:px-10 bg-white/95 backdrop-blur-sm z-10 shadow-sm">
      <div className="h-full flex items-center">
        <Link href="/">
          <div className="relative h-[40px] w-[140px] hover:opacity-90 transition-opacity">
            <Image
              src="/codefolio-logo.svg"
              alt="logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      <nav className="ml-auto flex items-center gap-1 sm:gap-2">
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
          href="/practice"
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hidden sm:block ${
            isActive("/practice")
              ? "text-blue-600 bg-blue-50"
              : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          演習問題
        </Link>

        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-100">
          <UserButton session={session} />

          <button
            className="block sm:hidden w-[36px] h-[36px] rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
            aria-label="メインメニュー"
          >
            <BiMenu className="text-xl" />
          </button>
        </div>
      </nav>
    </header>
  );
}
