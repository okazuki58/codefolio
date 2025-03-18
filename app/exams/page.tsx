import Link from "next/link";
import Image from "next/image";
import { getExams } from "@/lib/microcms";
import { BiTime, BiChevronRight } from "react-icons/bi";
import { Exam } from "@/types";

// メインページコンポーネント（デフォルトでサーバーコンポーネント）
export default async function ExamsPage(
  props: {
    searchParams: Promise<{ page?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = 9; // 1ページあたりの表示数
  const offset = (page - 1) * limit;

  // APIからデータ取得
  const { contents: exams, totalCount } = await getExams({
    limit,
    offset,
    orders: "-publishedAt",
  });

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-[calc(100vh-70px)] container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">演習課題一覧</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam: Exam) => (
            <div
              key={exam.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
            >
              {exam.imageUrl ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={exam.imageUrl}
                    alt={exam.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="h-24 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-blue-600 text-lg font-medium">
                    演習課題
                  </span>
                </div>
              )}

              <div className="p-5 flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-gray-600 text-xs">
                    <BiTime className="mr-1" />
                    <span>{exam.estimatedTime || exam.estimatedTime}分</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
                  {exam.title}
                </h2>

                <div
                  className="text-gray-700 text-sm mb-4 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: exam.description }}
                />

                <div className="flex flex-wrap gap-1 mb-4">
                  {exam.tags.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs border border-gray-200"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-5">
                <Link
                  href={`/exams/${exam.slug}`}
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  詳細を見る <BiChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 my-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Link
                  key={pageNum}
                  href={`/exams?page=${pageNum}`}
                  className={`w-10 h-10 flex items-center justify-center rounded ${
                    pageNum === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
