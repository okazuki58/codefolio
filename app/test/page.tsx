import Link from "next/link";
import { BiBookOpen, BiCheckCircle } from "react-icons/bi";
import { getCategories } from "@/lib/microcms";
import { Metadata } from "next";
import { Category } from "@/types";

export const metadata: Metadata = {
  title: "理解度チェックテスト - カテゴリ一覧",
  description: "ブログの理解度をチェックするためのテスト一覧です",
};

export default async function TestCategoriesPage() {
  const { contents: categories } = await getCategories();

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            理解度チェックテスト
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            学習したコンテンツの理解度を確認するためのテストです。
            カテゴリを選んで、テストを開始してください。
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center max-w-md mx-auto border border-gray-100">
            <BiCheckCircle className="text-gray-300 text-5xl mx-auto mb-4" />
            <p className="text-gray-500">
              テストカテゴリが見つかりませんでした
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {categories.map((category: Category) => (
              <Link
                key={category.id}
                href={`/test/category/${category.id}`}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 flex items-center group"
              >
                <div className="bg-blue-50 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-colors">
                  <BiCheckCircle className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {category.name}のテストを受ける
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <BiBookOpen className="mr-2" />
            学習ドキュメントに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
