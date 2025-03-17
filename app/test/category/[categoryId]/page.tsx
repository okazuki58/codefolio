import { getCategoryById, getTestsByCategory } from "@/lib/microcms";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestSession } from "@/app/test/components/TestSession";

interface CategoryTestsPageProps {
  params: Promise<{
    categoryId: string;
  }>;
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
    console.error("Failed to generate metadata:", error);
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

  console.log("Category page - received categoryId:", categoryId);

  try {
    const testsResponse = await getTestsByCategory(categoryId);
    const category = await getCategoryById(categoryId);

    const tests = testsResponse.contents || [];
    console.log("tests", tests);

    if (!category) {
      console.log("Category not found, redirecting to 404");
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
    console.error("Error in category page:", error);
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
