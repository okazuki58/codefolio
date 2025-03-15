import { getCategoryById, getTestsByCategory } from "@/lib/microcms";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestSession } from "@/app/test/components/TestSession";

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
      title: `${category.name} - 理解度テスト`,
      description: `${category.name}に関する理解度チェックテスト`,
    };
  } catch (error) {
    return {
      title: "テスト",
      description: "理解度チェックテスト",
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

    if (tests.length === 0) {
      return (
        <div className="min-h-[calc(100vh-70px)] bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
              <h1 className="text-2xl font-bold mb-4">
                {category.name} - テスト
              </h1>
              <p className="text-gray-600 mb-6">
                このカテゴリにはまだテストが登録されていません。
                別のカテゴリを選択してください。
              </p>
              <a
                href="/test"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                カテゴリ一覧に戻る
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[calc(100vh-70px)] bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* テストセッションコンポーネント */}
          <TestSession tests={tests} category={category} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching category tests:", error);
    return (
      <div className="min-h-[calc(100vh-70px)] bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <h1 className="text-2xl font-bold mb-4">エラーが発生しました</h1>
            <p className="text-gray-600 mb-6">
              テストデータの取得中にエラーが発生しました。
              しばらく経ってから再度お試しください。
            </p>
            <a
              href="/test"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              カテゴリ一覧に戻る
            </a>
          </div>
        </div>
      </div>
    );
  }
}
