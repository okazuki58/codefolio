import { getBlogWithDraftKey } from "@/lib/microcms";
import { notFound } from "next/navigation";
import { BlogDetail } from "@/components/blog/blog-detail";
import { Suspense } from "react";
import { BlogDetailSkeleton } from "@/components/blog/blog-detail-skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: {
    contentId: string;
  };
  searchParams: {
    draftKey?: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { contentId } = params;
  const { draftKey } = searchParams;

  if (!draftKey) {
    return notFound();
  }

  const blog = await getBlogWithDraftKey(contentId, draftKey);

  if (!blog) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-yellow-100 p-4 mb-6 rounded-md">
        <h2 className="text-amber-800 font-medium">プレビューモード</h2>
        <p className="text-amber-700 text-sm">
          これは公開前のプレビューです。この画面はCMS管理者のみが閲覧できます。
        </p>
      </div>

      <Suspense fallback={<BlogDetailSkeleton />}>
        <BlogDetail blog={blog} />
      </Suspense>
    </div>
  );
}
