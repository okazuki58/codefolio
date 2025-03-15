import Link from "next/link";
import { Session } from "next-auth";
import { BiRightArrowAlt, BiCheckCircle } from "react-icons/bi";

interface CTASectionProps {
  session: Session | null;
}

export function CTASection({ session }: CTASectionProps) {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="p-10 md:p-12 text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[#2563EB] text-sm font-medium mb-6">
              スキルアップの第一歩
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              実務で通用する
              <span className="text-[#2563EB] mx-2">エンジニアスキル</span>
              を身につけよう
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              月額1,280円で、基礎から実践までを体系的に学べるプラットフォーム
            </p>

            {session ? (
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-4 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors"
              >
                今すぐ学習を始める
                <BiRightArrowAlt className="ml-2 text-xl" />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/api/auth/signin"
                  className="inline-flex items-center px-8 py-4 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors"
                >
                  無料ではじめる
                  <BiRightArrowAlt className="ml-2 text-xl" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-8 py-4 border border-gray-200 hover:border-gray-300 bg-white text-gray-700 hover:text-gray-900 rounded-lg font-medium text-lg transition-colors"
                >
                  料金プランを見る
                  <BiRightArrowAlt className="ml-2 text-xl" />
                </Link>
              </div>
            )}

            <div className="mt-8 text-sm text-gray-500">
              14日間の返金保証付き・契約はいつでもキャンセル可能
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
