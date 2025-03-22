import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ResultDisplay } from "./result-display";
import { getExamById } from "@/lib/microcms";

interface ResultPageProps {
  params: Promise<{
    slug: string;
    resultId: string;
  }>;
}

export default async function ExamResultPage({ params }: ResultPageProps) {
  // パラメータを適切に処理 - 非同期パラメータを解決
  const { slug, resultId } = await params;

  const session = await auth();

  if (!session?.user) {
    return notFound();
  }

  const examResult = await prisma.examResult.findUnique({
    where: {
      id: resultId,
    },
    include: {
      user: true,
    },
  });

  if (!examResult || examResult.userId !== session.user.id) {
    return notFound();
  }

  // 演習情報の取得 (MicroCMSから)
  const exam = await getExamById(examResult.examId);

  if (!exam) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mb-20">
      <div className="mb-6">
        <Link
          href={`/exams/${slug}`}
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          ← 演習ページに戻る
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">演習結果</h1>
        <h2 className="text-lg text-gray-600 mt-1">{exam.title}</h2>
      </div>

      <div className="bg-white border border-gray-100 p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">提出情報</h2>
          <div>
            <p className="text-gray-600">リポジトリURL:</p>
            <a
              href={examResult.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {examResult.repositoryUrl}
            </a>
          </div>
        </div>

        <ResultDisplay
          resultId={examResult.id}
          initialData={{
            id: examResult.id,
            status: examResult.status,
            statusMessage: examResult.statusMessage || undefined,
            testsPassed: examResult.testsPassed,
            testsTotal: examResult.testsTotal,
            passPercentage: examResult.passPercentage,
            executionLog: examResult.executionLog || undefined,
            updatedAt: examResult.updatedAt.toISOString(),
          }}
        />
      </div>

      <div className="bg-white border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">次のステップ</h2>
        <div className="space-y-2">
          <p>
            •
            テストが失敗した場合は、ローカル環境で再度テストを試し、コードを修正し再提出してください。
          </p>
          <p>• テストに合格したら、次の演習に進みましょう。</p>
          <p>
            • 質問がある場合は、
            <Link href="/contact" className="text-blue-600 hover:underline">
              サポート
            </Link>
            までお問い合わせください。
          </p>
        </div>
      </div>
    </div>
  );
}
