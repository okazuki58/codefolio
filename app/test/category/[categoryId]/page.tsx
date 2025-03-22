import { getCategoryById } from "@/lib/microcms";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestSession } from "@/app/test/components/TestSession";
import Link from "next/link";
import { auth } from "@/lib/auth";

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
  const session = await auth();

  try {
    // CMSからカテゴリ情報を取得
    const category = await getCategoryById(categoryId);

    if (!category) {
      console.log("Category not found, redirecting to 404");
      return notFound();
    }

    // DBからテストデータを取得
    const tests = await prisma.test.findMany({
      where: {
        category: categoryId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

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
              <Link
                href="/test"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                カテゴリ一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[calc(100vh-70px)] bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* テストセッションコンポーネント */}
          <TestSession tests={tests} category={category} session={session} />
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
            <Link
              href="/test"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              カテゴリ一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
