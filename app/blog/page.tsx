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
  // searchParamsは使用しない（ページネーションを削除するため）
  const limit = 6; // 各カテゴリごとに最大6記事を表示

  const { contents: blogs } = await getBlogs({
    limit: 100, // 一度に十分な数のブログを取得
  });

  // 基礎レベルのブログ（最大6件）
  const basicBlogs = blogs
    .filter((blog: Blog) => blog.category?.level?.includes("基礎"))
    .sort((a: Blog, b: Blog) => {
      const indexA = a.category?.index ?? 999;
      const indexB = b.category?.index ?? 999;
      return indexA - indexB;
    })
    .slice(0, limit);

  // 発展レベルのブログ（最大6件）
  const advancedBlogs = blogs
    .filter((blog: Blog) => blog.category?.level?.includes("発展"))
    .sort((a: Blog, b: Blog) => {
      const indexA = a.category?.index ?? 999;
      const indexB = b.category?.index ?? 999;
      return indexA - indexB;
    })
    .slice(0, limit);

  // その他のブログ（最大6件）
  const otherBlogs = blogs
    .filter(
      (blog: Blog) =>
        !blog.category?.level ||
        (!blog.category.level.includes("基礎") &&
          !blog.category.level.includes("発展"))
    )
    .slice(0, limit);

  // 各カテゴリの総数を取得（「もっと見る」リンクの表示判断用）
  const basicTotal = blogs.filter((blog: Blog) =>
    blog.category?.level?.includes("基礎")
  ).length;
  const advancedTotal = blogs.filter((blog: Blog) =>
    blog.category?.level?.includes("発展")
  ).length;
  const otherTotal = blogs.filter(
    (blog: Blog) =>
      !blog.category?.level ||
      (!blog.category.level.includes("基礎") &&
        !blog.category.level.includes("発展"))
  ).length;

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
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
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
        <h1 className="text-3xl font-bold mb-8">学習ドキュメント</h1>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">記事が見つかりませんでした</p>
          </div>
        ) : (
          <div className="space-y-10">
            {basicBlogs.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 border-l-4 border-blue-500 pl-3">
                    基礎
                  </h2>
                  <Link
                    href="/blog/category/basic"
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                  >
                    すべて見る <BiRightArrowAlt className="ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {renderBlogCards(basicBlogs)}
                </div>
              </div>
            )}

            {advancedBlogs.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 border-l-4 border-purple-500 pl-3">
                    発展
                  </h2>
                  <Link
                    href="/blog/category/advanced"
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                  >
                    すべて見る <BiRightArrowAlt className="ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {renderBlogCards(advancedBlogs)}
                </div>
              </div>
            )}

            {otherBlogs.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 border-l-4 border-gray-400 pl-3">
                    その他
                  </h2>
                  <Link
                    href="/blog/category/other"
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                  >
                    すべて見る <BiRightArrowAlt className="ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {renderBlogCards(otherBlogs)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
