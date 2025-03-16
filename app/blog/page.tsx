import { getBlogs } from "@/lib/microcms";
import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { BiCalendar, BiRightArrowAlt } from "react-icons/bi";

interface BlogListPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogListPage({
  searchParams,
}: BlogListPageProps) {
  // 非同期で searchParams を取得
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1", 10);
  const limit = 9;
  const offset = (page - 1) * limit;

  const { contents: blogs, totalCount } = await getBlogs({
    limit,
    offset,
  });

  const totalPages = Math.ceil((totalCount || 0) / limit);

  // カテゴリのlevelフィールドに基づいてブログを分類
  const basicBlogs = blogs.filter((blog: Blog) =>
    blog.category?.level?.includes("基礎")
  );

  const advancedBlogs = blogs.filter((blog: Blog) =>
    blog.category?.level?.includes("発展")
  );

  // 「基礎」も「発展」も含まないブログ
  const otherBlogs = blogs.filter(
    (blog: Blog) =>
      !blog.category?.level ||
      (!blog.category.level.includes("基礎") &&
        !blog.category.level.includes("発展"))
  );

  const renderBlogCards = (blogList: Blog[]) => {
    return blogList.map((blog: Blog) => (
      <Link
        href={`/blog/${blog.id}`}
        key={blog.id}
        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
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
            <div className="bg-gray-100 w-full h-full flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
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
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                {blog.category.name}
              </span>
            )}
          </div>

          {/* タグ */}
          {blog.tags && (
            <div className="flex flex-wrap gap-1 mb-2">
              {blog.tags.split(",").map((tag) => (
                <span
                  key={tag.trim()}
                  className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

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
        <h1 className="text-3xl font-bold mb-8">学習ドキュメント</h1>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">記事が見つかりませんでした</p>
          </div>
        ) : (
          <div className="space-y-10">
            {basicBlogs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  基礎
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {renderBlogCards(basicBlogs)}
                </div>
              </div>
            )}

            {advancedBlogs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-purple-500 pl-3">
                  発展
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {renderBlogCards(advancedBlogs)}
                </div>
              </div>
            )}

            {otherBlogs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-gray-400 pl-3">
                  その他
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {renderBlogCards(otherBlogs)}
                </div>
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 my-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Link
                  key={pageNum}
                  href={`/blog?page=${pageNum}`}
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
