import { getBlogWithDraftKey } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogContent from "./content";
import BlogTableOfContents from "./table-of-contents";
import { BiCalendar } from "react-icons/bi";
import { extractHeadings } from "../utils";

interface BlogPageProps {
  params: {
    id: string;
  };
  searchParams: {
    draftKey?: string;
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { id } = params;
  const { draftKey } = searchParams;

  const blog = await getBlogWithDraftKey(id, draftKey);

  if (!blog) {
    notFound();
  }

  // HTMLコンテンツから見出しを抽出
  const { headings, modifiedHtml } = extractHeadings(blog.content);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 md:px-10 mt-4 md:mt-7 text-sm text-gray-500">
        <Link href="/blog" className="hover:underline">
          ブログ
        </Link>{" "}
        &gt; {blog.title}
      </div>

      {/* Blog Header */}
      <div className="px-4 sm:px-6 md:px-10 mt-4 md:mt-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center mt-2 gap-3">
          {blog.category && (
            <span className="bg-blue-600 text-white text-xs px-5 py-1 rounded">
              {blog.category.name}
            </span>
          )}
          <span className="text-sm text-gray-500 flex items-center">
            <BiCalendar className="mr-1" />
            {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row px-4 sm:px-6 md:px-10 mt-5 pb-20 gap-6">
        {/* Table of Contents */}
        <BlogTableOfContents items={headings} />

        {/* Main Content */}
        <main className="flex-1 bg-white sm:rounded sm:p-4 md:p-5 sm:border-2 sm:border-gray-50 order-2 lg:order-1 max-w-full lg:max-w-[calc(100%-320px-1.5rem)] mx-auto lg:mx-0">
          {blog.eyecatch && (
            <div className="mb-6 relative w-full aspect-[3/2]">
              <Image
                src={blog.eyecatch.url}
                alt={blog.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          )}

          <BlogContent content={modifiedHtml || blog.content} />
        </main>
      </div>
    </div>
  );
}
