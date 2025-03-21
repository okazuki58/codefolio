import Link from "next/link";
import {
  BiCodeBlock,
  BiGitBranch,
  BiBookOpen,
  BiCheckShield,
  BiRightArrowAlt,
} from "react-icons/bi";

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center px-4 py-10 sm:py-0 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
          <div className="flex-1 space-y-6 sm:space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[#2563EB] text-sm font-medium">
              プログラミング学習プラットフォーム
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              実務で通用する
              <br />
              <span className="text-[#2563EB]">エンジニアスキル</span>を<br />
              体系的に習得
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-lg">
              未経験から実務レベルまで。学習から実践までをひとつのプラットフォームで。
            </p>

            {/* 特徴リスト */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1 sm:py-2">
              <div className="flex items-center text-gray-700">
                <div className="mr-2 p-1 bg-blue-50 rounded-md">
                  <BiCheckShield className="w-5 h-5 text-[#2563EB]" />
                </div>
                <span className="text-sm sm:text-base">
                  実践的なプロジェクト課題
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="mr-2 p-1 bg-blue-50 rounded-md">
                  <BiGitBranch className="w-5 h-5 text-[#2563EB]" />
                </div>
                <span className="text-sm sm:text-base">
                  現役エンジニアによるレビュー
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="mr-2 p-1 bg-blue-50 rounded-md">
                  <BiBookOpen className="w-5 h-5 text-[#2563EB]" />
                </div>
                <span className="text-sm sm:text-base">
                  体系的なカリキュラム
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="mr-2 p-1 bg-blue-50 rounded-md">
                  <BiCodeBlock className="w-5 h-5 text-[#2563EB]" />
                </div>
                <span className="text-sm sm:text-base">最新技術スタック</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                href="/blog"
                className="px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                学習を始める
                <BiRightArrowAlt className="ml-1.5" />
              </Link>
            </div>

            {/* ソーシャルプルーフ - モバイルでは非表示 */}
            <div className="hidden sm:block pt-4 sm:pt-6 border-t border-gray-100 mt-4 sm:mt-6">
              <p className="text-sm text-gray-500 mb-2">
                多くの学習者に選ばれています
              </p>
              <div className="flex space-x-4">
                <span className="flex items-center text-gray-700">
                  <BiCodeBlock className="text-[#2563EB] mr-1.5" /> 10,000+
                  学習者
                </span>
                <span className="flex items-center text-gray-700">
                  <BiGitBranch className="text-[#2563EB] mr-1.5" /> 500+
                  プロジェクト
                </span>
              </div>
            </div>
          </div>

          {/* 右側の要素 - デスクトップのみ表示 */}
          <div className="flex-1 relative h-80 lg:h-96 w-full max-w-md hidden lg:block">
            <div className="absolute top-10 right-10 w-64 h-64 border-2 border-[#2563EB] rounded-lg opacity-20"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#2563EB] rounded-lg opacity-10"></div>
            <div className="absolute top-16 right-16 w-64 h-64 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <BiCodeBlock className="text-white text-6xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
