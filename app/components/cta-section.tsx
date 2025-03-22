import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

export function CTASection() {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="p-10 md:p-12 text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
              スキルアップの第一歩
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              実務で通用する
              <span className="text-blue-600 mx-2">エンジニアスキル</span>
              を身につけよう
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              月額1,280円で、基礎から実践までを体系的に学べるプラットフォーム
            </p>

            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors"
            >
              学習を始める
              <BiRightArrowAlt className="ml-2 text-xl" />
            </Link>

            <div className="mt-8 text-sm text-gray-500">
              14日間の返金保証付き・契約はいつでもキャンセル可能
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
