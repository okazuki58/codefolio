import { getBlogWithDraftKey } from "@/lib/microcms";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogContent from "./content";
import BlogTableOfContents from "./table-of-contents";
import { extractHeadings } from "../utils";
import { BlogHeader } from "./header";
import { Breadcrumb } from "./breadcrumb";

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    draftKey?: string;
  }>;
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  // 動的APIを非同期で取得
  const { id } = await params;
  const { draftKey } = await searchParams;

  const blog = await getBlogWithDraftKey(id, draftKey);

  if (!blog) {
    notFound();
  }

  // HTMLコンテンツから見出しを抽出
  const { headings, modifiedHtml } = extractHeadings(blog.content);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb title={blog.title} />

      {/* Blog Header */}
      <BlogHeader blog={blog} />

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

          <BlogContent
            content={modifiedHtml || blog.content}
            categoryId={blog.category?.id}
          />
        </main>
      </div>
    </div>
  );
}
