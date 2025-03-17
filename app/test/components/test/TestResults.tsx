import Link from "next/link";
import {
  BiArrowBack,
  BiCheckCircle,
  BiXCircle,
  BiRightArrowAlt,
  BiLogIn,
} from "react-icons/bi";
import { TestResultsProps } from "@/app/test/types";

export function TestResults({
  tests,
  category,
  answers,
  correctIndices,
  shuffledOptions,
  results,
  session,
  onRestart,
}: TestResultsProps) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100">
      <h1 className="text-2xl font-bold mb-4">{category.name} - テスト結果</h1>

      <div className="mb-8 text-center">
        <div className="text-5xl font-bold mb-2">
          {results.correct} / {results.total}
        </div>
        <div className="text-xl text-gray-600">
          正答率: {results.percentage}%
        </div>

        <div className="w-full bg-gray-100 rounded-full h-4 mt-6">
          <div
            className={`h-4 rounded-full ${
              results.percentage >= 80
                ? "bg-green-500"
                : results.percentage >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${results.percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-8 mb-8">
        {tests.map((test, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              answers[index] === correctIndices[index]
                ? "bg-green-50"
                : "bg-red-50"
            }`}
          >
            <div className="flex items-start mb-3">
              {answers[index] === correctIndices[index] ? (
                <BiCheckCircle className="text-green-500 text-xl mt-1 mr-2 flex-shrink-0" />
              ) : (
                <BiXCircle className="text-red-500 text-xl mt-1 mr-2 flex-shrink-0" />
              )}
              <div>
                <span className="text-sm text-gray-500">問題 {index + 1}</span>
                <h3 className="font-semibold">{test.question}</h3>
              </div>
            </div>

            <div className="ml-7">
              <p className="text-sm text-gray-600 mb-1">あなたの回答:</p>
              <p
                className={`font-medium ${
                  answers[index] === correctIndices[index]
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {shuffledOptions[index][answers[index] as number]}
              </p>

              {answers[index] !== correctIndices[index] && (
                <>
                  <p className="text-sm text-gray-600 mt-3 mb-1">正解:</p>
                  <p className="font-medium text-green-700">
                    {shuffledOptions[index][correctIndices[index]]}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {!session || !("user" in session) ? (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <BiLogIn className="text-blue-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-blue-700">
                テスト結果を保存してあなたの学習進捗を記録するには、ログインしてください。
              </p>
              <Link
                href={`/auth/signin?callbackUrl=/test/category/${category.id}`}
                className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                ログインする
                <BiRightArrowAlt className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex justify-between mt-8">
        <Link
          href="/test"
          className="inline-flex items-center justify-center px-5 py-2 rounded-full text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          <BiArrowBack className="mr-2" />
          カテゴリ一覧に戻る
        </Link>

        <button
          onClick={onRestart}
          className="inline-flex items-center justify-center px-5 py-2 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          もう一度挑戦する
        </button>
      </div>
    </div>
  );
}
