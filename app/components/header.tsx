import { BiMenu as BiMenuIcon } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-[70px] border-b border-gray-200 flex items-center px-4 sm:px-6 md:px-10 bg-white z-10">
      <div className="font-bold text-xl sm:text-2xl text-gray-800 h-full flex items-center">
        <Link href="/">
          <div className="relative h-[50px] w-[140px]">
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
      <div className="ml-auto flex items-center gap-4 sm:gap-8">
        <Link href="#" className="text-gray-700 hidden sm:block">
          ホーム
        </Link>
        <Link
          href="/blog"
          className="text-blue-600 font-semibold hidden sm:block"
        >
          学習ドキュメント
        </Link>
        <Link href="/test" className="text-gray-700 hidden sm:block">
          理解度テスト
        </Link>
        <Link href="#" className="text-gray-700 hidden sm:block">
          演習問題
        </Link>
        <div className="w-[30px] h-[30px] rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
          P
        </div>
        <BiMenuIcon
          className="block sm:hidden text-2xl text-gray-700"
          aria-label="メニュー"
        />
      </div>
    </header>
  );
}
