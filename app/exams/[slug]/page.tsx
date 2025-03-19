import Image from "next/image";
import Link from "next/link";
import { getExamBySlug } from "@/lib/microcms";
import {
  BiTime,
  BiTag,
  BiGitRepoForked,
  BiLinkExternal,
  BiChevronLeft,
} from "react-icons/bi";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";

interface ExamPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ExamPage(props: ExamPageProps) {
  const params = await props.params;
  const { slug } = params;

  try {
    const exam = await getExamBySlug(slug);
    const user = await auth();

    return (
      <div className="container mx-auto px-0 md:px-4 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 md:mb-8 px-4 md:px-0">
            <Link
              href="/exams"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <BiChevronLeft className="mr-1" /> 演習一覧に戻る
            </Link>
          </div>

          {exam.imageUrl && (
            <div className="relative h-48 md:h-72 w-full mb-4 md:mb-8 md:rounded-lg overflow-hidden shadow-sm">
              <Image
                src={exam.imageUrl}
                alt={exam.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="bg-white md:border md:border-gray-200 md:rounded-lg p-4 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
              <div className="flex items-center text-gray-600">
                <BiTime className="mr-1" />
                <span>
                  所要時間: 約{exam.estimatedTime || exam.estimatedTime}分
                </span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
              {exam.title}
            </h1>

            <div className="prose max-w-none mb-6 md:mb-8">
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: exam.description }}
              />
            </div>

            <div className="mb-6 md:mb-8">
              <h2 className="text-xl font-semibold mb-2 md:mb-3 text-gray-800">
                タグ
              </h2>
              <div className="flex flex-wrap gap-2">
                {exam.tags.split(",").map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 md:px-3 md:py-1.5 rounded text-xs md:text-sm md:border md:border-gray-200"
                  >
                    <BiTag className="inline mr-1" />
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <h2 className="text-xl font-semibold mb-2 md:mb-3 text-gray-800">
                リポジトリ情報
              </h2>
              <div className="bg-gray-50 p-3 md:p-5 rounded md:border md:border-gray-200">
                <p className="flex items-center mb-2 md:mb-3">
                  <BiGitRepoForked className="mr-2 text-gray-600" />
                  <span className="font-medium text-gray-800">
                    {exam.repositoryName}
                  </span>
                </p>
                <a
                  href={exam.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 flex items-center font-medium"
                >
                  リポジトリを開く
                  <BiLinkExternal className="ml-1" />
                </a>
              </div>
            </div>

            {exam.repositoryUrlAnswer && (
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl font-semibold mb-2 md:mb-3 text-gray-800">
                  リポジトリ情報（模範回答）
                </h2>
                <div className="bg-gray-50 p-3 md:p-5 rounded md:border md:border-gray-200">
                  {user?.user?.isPaidMember ? (
                    <>
                      <p className="flex items-center mb-2 md:mb-3">
                        <BiGitRepoForked className="mr-2 text-gray-600" />
                        <span className="font-medium text-gray-800">
                          模範回答
                        </span>
                      </p>
                      <a
                        href={exam.repositoryUrlAnswer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center font-medium"
                      >
                        模範回答を開く
                        <BiLinkExternal className="ml-1" />
                      </a>
                    </>
                  ) : (
                    <div className="text-center p-3">
                      <p className="text-gray-700 mb-3">
                        模範回答は有料会員のみが閲覧できます
                      </p>
                      <Link
                        href="/pricing"
                        className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                      >
                        会員プランを見る
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {exam.issueNumbers && exam.issueNumbers.trim() !== "" && (
              <div className="mb-8 md:mb-10">
                <h2 className="text-xl font-semibold mb-2 md:mb-3 text-gray-800">
                  課題
                </h2>
                <div className="bg-gray-50 p-3 md:p-5 rounded md:border md:border-gray-200">
                  <ul className="space-y-2 md:space-y-3">
                    {exam.issueNumbers.split(",").map((issueNumber: string) => (
                      <li key={issueNumber} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <a
                          href={`${
                            exam.repositoryUrl
                          }/issues/${issueNumber.trim()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Issue #{issueNumber.trim()} を確認する
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center">
              {user ? (
                <Link
                  href={exam.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-3.5 rounded font-medium text-base md:text-lg hover:bg-blue-700 transition-colors inline-flex items-center w-full md:w-auto justify-center"
                >
                  演習に挑戦する <BiLinkExternal className="ml-1" />
                </Link>
              ) : (
                <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg w-full max-w-md">
                  <p className="text-gray-700 mb-3">
                    演習に挑戦するにはログインが必要です
                  </p>
                  <Link
                    href="/auth/signin"
                    className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                  >
                    ログインする
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch exam:", error);
    notFound();
  }
}
