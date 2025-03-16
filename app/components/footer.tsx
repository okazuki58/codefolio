import Link from "next/link";
import Image from "next/image";
import {
  BiLogoGithub,
  BiLogoTwitter,
  BiLogoLinkedin,
  BiLogoYoutube,
  BiEnvelope,
  BiCheckShield,
  BiRightArrowAlt,
} from "react-icons/bi";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* ブランドカラム */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="relative h-[40px] w-[40px] mr-3">
                <Image
                  src="/codefolio-logo-only.svg"
                  alt="logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                codefolio
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              実務で通用するエンジニアスキルを体系的に習得できる学習プラットフォーム
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/codefolio"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <BiLogoGithub className="text-xl" />
              </a>
              <a
                href="https://twitter.com/codefolio"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <BiLogoTwitter className="text-xl" />
              </a>
              <a
                href="https://linkedin.com/company/codefolio"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <BiLogoLinkedin className="text-xl" />
              </a>
              <a
                href="https://youtube.com/codefolio"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <BiLogoYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">サービス</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  学習ドキュメント
                </Link>
              </li>
              <li>
                <Link
                  href="/test"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  理解度テスト
                </Link>
              </li>
              <li>
                <Link
                  href="/exams"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  演習問題
                </Link>
              </li>
              <li>
                <Link
                  href="/mentor"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  メンタリング
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  料金プラン
                </Link>
              </li>
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">会社情報</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  会社概要
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  チーム
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  採用情報
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  プレスリリース
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">サポート</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  ヘルプセンター
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  よくある質問
                </Link>
              </li>
              <li className="flex items-center">
                <BiEnvelope className="mr-2 text-blue-600" />
                <a
                  href="mailto:support@codefolio.jp"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  support@codefolio.jp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ニュースレター登録 */}
        <div className="border-t border-gray-200 mt-12 pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-gray-900 font-semibold mb-2">
                最新情報を受け取る
              </h3>
              <p className="text-gray-600">
                新しいコンテンツや機能についての最新情報をお届けします
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex items-center max-w-md bg-white rounded-lg p-1 border border-gray-200 hover:border-gray-300 transition-colors">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="w-full px-4 py-2.5 rounded-lg bg-transparent text-gray-800 outline-none flex-grow"
                />
                <button className="ml-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors whitespace-nowrap">
                  登録する
                  <BiRightArrowAlt className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <BiCheckShield className="text-blue-600 mr-2" />
            <span className="text-gray-600">セキュアな決済処理</span>
          </div>
          <div className="text-gray-600 text-sm mt-4 md:mt-0">
            &copy; {currentYear} codefolio Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
