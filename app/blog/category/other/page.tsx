import { getBlogs } from "@/lib/microcms";
import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { BiCalendar, BiRightArrowAlt, BiArrowBack } from "react-icons/bi";

interface BlogCategoryPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function OtherBlogListPage({
  searchParams,
}: BlogCategoryPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 9; // 1ページあたりの表示数
  const offset = (page - 1) * limit;

  // すべてのブログを取得
  const { contents: allBlogs, totalCount: allTotal } = await getBlogs({
    limit: 100, // 一度に十分な数のブログを取得
  });

  // その他のブログのみをフィルタリング
  const filteredBlogs = allBlogs.filter(
    (blog: Blog) =>
      !blog.category?.level ||
      (!blog.category.level.includes("基礎") &&
        !blog.category.level.includes("発展"))
  );

  // ページネーション用の計算
  const totalBlogs = filteredBlogs.length;
  const totalPages = Math.ceil(totalBlogs / limit);

  // 現在のページに表示するブログ
  const blogs = filteredBlogs.slice(offset, offset + limit);

  const renderBlogCards = (blogList: Blog[]) => {
    return blogList.map((blog: Blog) => (
      <Link
        href={`/blog/${blog.id}`}
        key={blog.id}
        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-3 hover:shadow-lg"
      >
        <div className="relative w-full aspect-[3/2]">
          {blog.eyecatch ? (
            <Image
              src={blog.eyecatch.url}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="bg-gradient-to-br from-blue-50 to-gray-100 w-full h-full flex items-center justify-center p-6">
              <Image
                src="/codefolio-logo-only.svg"
                alt="CodeFolio Logo"
                width={80}
                height={80}
                className="opacity-70"
              />
            </div>
          )}
        </div>
        <div className="p-4">
          {/* 日付とカテゴリー */}
          <div className="flex items-center flex-wrap text-sm text-gray-500 mb-2">
            <div className="flex items-center mr-2">
              <BiCalendar className="mr-1" />
              <time dateTime={blog.publishedAt}>
                {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
              </time>
            </div>
            {blog.category && (
              <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">
                {blog.category.name}
              </span>
            )}
          </div>

          {/* タイトル */}
          <h2 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h2>

          {/* 続きを読む */}
          <div className="flex items-center text-blue-600 text-sm mt-1">
            <span>続きを読む</span>
            <BiRightArrowAlt className="ml-1" />
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div className="min-h-[calc(100vh-70px)] container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">その他の学習ドキュメント</h1>

        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-6"
        >
          <BiArrowBack className="mr-1" />
          学習ドキュメント一覧に戻る
        </Link>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">記事が見つかりませんでした</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {renderBlogCards(blogs)}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 my-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/blog/category/other?page=${pageNum}`}
                      className={`w-10 h-10 flex items-center justify-center rounded ${
                        pageNum === page
                          ? "bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
