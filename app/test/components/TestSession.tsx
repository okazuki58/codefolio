"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BiArrowBack,
  BiCheckCircle,
  BiXCircle,
  BiRightArrowAlt,
  BiPlayCircle,
} from "react-icons/bi";
import { Test, Category } from "@/types";

interface TestSessionProps {
  tests: Test[];
  category: Category;
}

export function TestSession({ tests, category }: TestSessionProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(tests.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]);
  const [correctIndices, setCorrectIndices] = useState<number[]>([]);

  // テストの初期化
  useEffect(() => {
    const initialShuffledOptions: string[][] = [];
    const initialCorrectIndices: number[] = [];

    tests.forEach((test) => {
      const options = test.answer_options.split(",");
      const correctOption = options[0]; // 最初が正解

      // 選択肢をシャッフル
      const shuffled = [...options].sort(() => Math.random() - 0.5);
      initialShuffledOptions.push(shuffled);

      // シャッフル後の正解のインデックス
      initialCorrectIndices.push(shuffled.indexOf(correctOption));
    });

    setShuffledOptions(initialShuffledOptions);
    setCorrectIndices(initialCorrectIndices);
  }, [tests]);

  // 回答を記録
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  // 次の問題へ
  const handleNext = () => {
    if (currentQuestion < tests.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  // 前の問題へ
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // テスト開始
  const startTest = () => {
    setIsStarted(true);
  };

  // 結果を計算
  const calculateResults = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === correctIndices[index]) {
        correct++;
      }
    });
    return {
      correct,
      total: tests.length,
      percentage: Math.round((correct / tests.length) * 100),
    };
  };

  // テスト結果表示
  if (showResults) {
    const results = calculateResults();

    return (
      <div className="bg-white rounded-xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          {category.name} - テスト結果
        </h1>

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
                  <span className="text-sm text-gray-500">
                    問題 {index + 1}
                  </span>
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

        <div className="flex justify-between">
          <Link
            href="/test"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <BiArrowBack className="mr-2" />
            カテゴリ一覧に戻る
          </Link>

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers(Array(tests.length).fill(null));
              setShowResults(false);
            }}
            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            もう一度挑戦する
          </button>
        </div>
      </div>
    );
  }

  // テスト開始前の画面
  if (!isStarted) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          {category.name} - 理解度テスト
        </h1>

        <div className="mb-8">
          <p className="text-gray-600 mb-3">
            このテストでは、{category.name}に関する{tests.length}
            問の問題に挑戦します。
          </p>
          <p className="text-gray-600 mb-3">
            各問題には複数の選択肢があり、最も適切な答えを1つ選んでください。
          </p>
          <p className="text-gray-600">
            全ての問題に回答すると、テスト結果が表示されます。
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <BiCheckCircle className="text-blue-600 text-xl mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">テスト情報</h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• 問題数: {tests.length}問</li>
                <li>• 制限時間: なし</li>
                <li>• カテゴリ: {category.name}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link
            href="/test"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <BiArrowBack className="mr-2" />
            カテゴリ一覧に戻る
          </Link>

          <button
            onClick={startTest}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            テストを開始する
            <BiPlayCircle className="ml-2 text-xl" />
          </button>
        </div>
      </div>
    );
  }

  // 問題が読み込まれていなければローディング表示
  if (shuffledOptions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // テスト問題表示
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/test"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <BiArrowBack className="mr-1" />
          中止
        </Link>
        <div className="text-sm text-gray-500">
          問題 {currentQuestion + 1} / {tests.length}
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-2xl font-bold">
          {tests[currentQuestion].question}
        </h1>
      </div>

      <div className="space-y-3 mb-8">
        {shuffledOptions[currentQuestion].map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              answers[currentQuestion] === index
                ? "border-blue-500 bg-blue-50"
                : "hover:border-blue-500 hover:bg-blue-50 cursor-pointer border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-3 bg-blue-100 w-7 h-7 rounded-full flex items-center justify-center text-blue-700 font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div>
          {currentQuestion > 0 && (
            <button
              onClick={handlePrevious}
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <BiArrowBack className="mr-1" />
              前の問題
            </button>
          )}
        </div>
        <div>
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white transition-colors ${
              answers[currentQuestion] === null
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {currentQuestion < tests.length - 1 ? "次へ" : "結果を見る"}
            <BiRightArrowAlt className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
