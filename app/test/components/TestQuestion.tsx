"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BiCheckCircle,
  BiXCircle,
  BiArrowBack,
  BiBookOpen,
} from "react-icons/bi";

interface TestQuestionProps {
  question: string;
  answerOptions: string[];
  blogRelationId: string;
  blogRelationName: string;
  blogId?: string;
}

export function TestQuestion({
  question,
  answerOptions,
  blogRelationId,
  blogRelationName,
  blogId,
}: TestQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [shuffledCorrectIndex, setShuffledCorrectIndex] = useState<number>(0);

  // 選択肢をシャッフルする
  useEffect(() => {
    const optionsWithIndex = answerOptions.map((option, index) => ({
      option,
      isCorrect: index === 0, // 最初の選択肢が正解
    }));

    // Fisher-Yates シャッフルアルゴリズム
    const shuffled = [...optionsWithIndex];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledOptions(shuffled.map((item) => item.option));
    setShuffledCorrectIndex(shuffled.findIndex((item) => item.isCorrect));
  }, [answerOptions]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setIsCorrect(index === shuffledCorrectIndex);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/test/category/${blogRelationId}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <BiArrowBack className="mr-1" />
          テスト一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-6">{question}</h1>

        <div className="space-y-3">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                selectedAnswer === null && handleAnswerSelect(index)
              }
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-md border transition-all ${
                selectedAnswer === null
                  ? "hover:border-blue-500 cursor-pointer border-gray-300"
                  : selectedAnswer === index
                  ? isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : index === shuffledCorrectIndex && selectedAnswer !== null
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 opacity-70"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
                {selectedAnswer === index && isCorrect && (
                  <BiCheckCircle className="ml-auto text-green-500 text-xl" />
                )}
                {selectedAnswer === index && !isCorrect && (
                  <BiXCircle className="ml-auto text-red-500 text-xl" />
                )}
                {index === shuffledCorrectIndex &&
                  selectedAnswer !== null &&
                  selectedAnswer !== index && (
                    <BiCheckCircle className="ml-auto text-green-500 text-xl" />
                  )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedAnswer !== null && (
        <div
          className={`p-4 rounded-md ${
            isCorrect ? "bg-green-50" : "bg-red-50"
          } mb-6`}
        >
          <div className="flex items-center mb-2">
            {isCorrect ? (
              <>
                <BiCheckCircle className="text-green-500 text-xl mr-2" />
                <h3 className="font-semibold text-green-800">正解です！</h3>
              </>
            ) : (
              <>
                <BiXCircle className="text-red-500 text-xl mr-2" />
                <h3 className="font-semibold text-red-800">
                  不正解です。正解は:{" "}
                  {String.fromCharCode(65 + shuffledCorrectIndex)}
                </h3>
              </>
            )}
          </div>

          {blogId && (
            <Link
              href={`/blog/${blogId}`}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <BiBookOpen className="mr-2" />「{blogRelationName}」の記事を読む
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
