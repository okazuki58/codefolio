import { BiMenu as BiMenuIcon } from "react-icons/bi";

export default function Header() {
  return (
    <header className="h-[70px] border-b border-gray-200 flex items-center px-4 sm:px-6 md:px-10 bg-white z-10">
      <div className="font-bold text-xl sm:text-2xl text-gray-800">
        CodePortfolio
      </div>
      <div className="ml-auto flex items-center gap-4 sm:gap-8">
        <a href="#" className="text-gray-700 hidden sm:block">
          ホーム
        </a>
        <a href="#" className="text-gray-700 hidden sm:block">
          課題一覧
        </a>
        <a href="#" className="text-blue-600 font-semibold hidden sm:block">
          基礎概念
        </a>
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

// Mobile menu icon component
function BiMenu({
  className,
  "aria-label": ariaLabel,
}: {
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
    >
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
    </svg>
  );
}
