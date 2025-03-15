import Link from "next/link";
import { BiArrowBack, BiCheckSquare } from "react-icons/bi";
import { getTestsByCategory, getCategoryById } from "@/lib/microcms";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Category, Test } from "@/types";

interface CategoryTestsPageProps {
  params: {
    categoryId: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryTestsPageProps): Promise<Metadata> {
  try {
    const { categoryId } = await params;
    const category = await getCategoryById(categoryId);

    if (!category) {
      return {
        title: "カテゴリが見つかりません",
      };
    }

    return {
      title: `${category.name} - テスト一覧`,
      description: `${category.name}に関する理解度チェックテスト一覧`,
    };
  } catch (error) {
    return {
      title: "テスト一覧",
      description: "カテゴリ別テスト一覧",
    };
  }
}

export default async function CategoryTestsPage({
  params,
}: CategoryTestsPageProps) {
  const { categoryId } = await params;

  try {
    const testsResponse = await getTestsByCategory(categoryId);
    const category = await getCategoryById(categoryId);

    const tests = testsResponse.contents || [];

    if (!category) {
      return notFound();
    }

    return (
      <div className="min-h-[calc(100vh-70px)] container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link
              href="/test"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <BiArrowBack className="mr-1" />
              カテゴリ一覧に戻る
            </Link>

            <h1 className="text-3xl font-bold mt-4">
              {category.name} - テスト一覧
            </h1>
            <p className="text-gray-600 mt-2">
              {tests.length === 0
                ? "このカテゴリにはまだテストがありません。"
                : `このカテゴリには${tests.length}件のテストがあります。チャレンジしてみましょう。`}
            </p>
          </div>

          {tests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-500 text-center">
                現在テストはありません。後日追加される予定です。
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {tests.map((test: Test, index: number) => (
                <Link
                  key={test.id}
                  href={`/test/${test.id}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start md:items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                      <BiCheckSquare className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        問題 {index + 1}
                      </span>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {test.question}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-[calc(100vh-70px)] container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">エラーが発生しました</h1>
          <pre className="bg-red-50 p-4 rounded overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}
