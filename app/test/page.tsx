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
    <div className="min-h-[calc(100vh-70px)] container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">理解度チェックテスト</h1>
        <p className="text-gray-600 mb-8">
          学習したコンテンツの理解度を確認するためのテストです。
          カテゴリを選んで、テストを開始してください。
        </p>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              テストカテゴリが見つかりませんでした
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category: Category) => (
              <Link
                key={category.id}
                href={`/test/category/${category.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center"
              >
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <BiCheckCircle className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    このカテゴリのテストを受ける
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <BiBookOpen className="mr-2" />
            学習ドキュメントに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
