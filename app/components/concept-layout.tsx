import Header from "@/app/components/header";
import TableOfContents from "@/app/components/table-of-contents";
import { ReactNode } from "react";

interface ConceptArticleData {
  title: string;
  category: string;
  learningTime: number;
  tableOfContents: Array<{
    id: string;
    title: string;
    isActive?: boolean;
  }>;
  relatedConcepts: Array<{
    title: string;
  }>;
  relatedTasks: Array<{
    title: string;
  }>;
}

interface ConceptLayoutProps {
  articleData: ConceptArticleData;
  children: ReactNode;
}

export default function ConceptLayout({
  articleData,
  children,
}: ConceptLayoutProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header />

      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 md:px-10 mt-4 md:mt-7 text-sm text-gray-500">
        <a href="/concepts" className="hover:underline">
          基礎概念
        </a>{" "}
        &gt; {articleData.title}
      </div>

      {/* Concept Header */}
      <div className="px-4 sm:px-6 md:px-10 mt-4 md:mt-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {articleData.title}
        </h1>
        <div className="flex flex-wrap items-center mt-2 gap-3">
          <span className="bg-blue-600 text-white text-xs px-5 py-1 rounded">
            {articleData.category}
          </span>
          <span className="text-sm text-gray-500">
            推定学習時間: {articleData.learningTime}分
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row px-4 sm:px-6 md:px-10 mt-5 pb-20 gap-6">
        <TableOfContents
          items={articleData.tableOfContents}
          relatedConcepts={articleData.relatedConcepts}
          relatedTasks={articleData.relatedTasks}
        />

        <main className="flex-1 bg-white sm:rounded sm:p-4 md:p-5 sm:border-2 sm:border-gray-50 max-w-full lg:max-w-[calc(100%-320px-1.5rem)] mx-auto lg:mx-0">
          {children}
        </main>
      </div>
    </div>
  );
}
