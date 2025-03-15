import { getTestById, getBlogs } from "@/lib/microcms";
import { TestQuestion } from "../components/TestQuestion";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface TestPageParams {
  params: {
    testId: string;
  };
}

export async function generateMetadata({
  params,
}: TestPageParams): Promise<Metadata> {
  try {
    const { testId } = await params;
    const test = await getTestById(testId);

    if (!test) {
      return {
        title: "テストが見つかりません",
      };
    }

    return {
      title: `テスト: ${test.question}`,
      description: `${test.blog_relation.name}の理解度チェックテスト`,
    };
  } catch (error) {
    return {
      title: "テスト",
      description: "理解度チェックテスト",
    };
  }
}

export default async function TestPage({ params }: TestPageParams) {
  try {
    const { testId } = await params;
    const test = await getTestById(testId);

    if (!test) {
      return notFound();
    }

    // 回答選択肢を配列に分割
    const answerOptions = test.answer_options.split(",");

    // 関連するブログを取得
    const { contents: relatedBlogs } = await getBlogs({
      filters: `category[equals]${test.blog_relation.id}`,
      limit: 1,
    });

    const blogId = relatedBlogs.length > 0 ? relatedBlogs[0].id : undefined;

    return (
      <div className="min-h-[calc(100vh-70px)] container mx-auto px-4 py-8">
        <TestQuestion
          question={test.question}
          answerOptions={answerOptions}
          blogRelationId={test.blog_relation.id}
          blogRelationName={test.blog_relation.name}
          blogId={blogId}
        />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
