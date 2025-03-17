"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Category } from "@/types";
import { TestIntro } from "./test/TestIntro";
import { TestQuestions } from "./test/TestQuestions";
import { TestResults } from "./test/TestResults";
import { TestLoadingState } from "./test/TestLoadingState";
import { TestData, TestResult } from "@/app/test/types";

export function TestSession({
  tests,
  category,
}: {
  tests: TestData[];
  category: Category;
}) {
  const { data: session } = useSession();
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(tests.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]);
  const [correctIndices, setCorrectIndices] = useState<number[]>([]);
  const [results, setResults] = useState<TestResult | null>(null);

  // Fisher-Yatesシャッフルアルゴリズム
  const fisherYatesShuffle = useCallback(<T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // テストの初期化
  useEffect(() => {
    const initialShuffledOptions: string[][] = [];
    const initialCorrectIndices: number[] = [];

    tests.forEach((test) => {
      // 配列の場合は各要素を取り出して文字列に変換
      const options = Array.isArray(test.answerOptions)
        ? test.answerOptions.map((opt) => String(opt))
        : [];

      const correctOption = options[test.correctAnswer];

      // シャッフルして表示用の配列を生成
      const shuffled = fisherYatesShuffle([...options]);
      initialShuffledOptions.push(shuffled);
      initialCorrectIndices.push(shuffled.indexOf(correctOption));
    });

    setShuffledOptions(initialShuffledOptions);
    setCorrectIndices(initialCorrectIndices);
  }, [tests, fisherYatesShuffle]);

  // 結果の計算
  const calculateResults = useCallback(() => {
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
  }, [answers, correctIndices, tests.length]);

  // テスト結果保存
  const saveTestResult = useCallback(
    async (results: TestResult) => {
      if (!session?.user) {
        console.log("ユーザーがログインしていないため、結果は保存されません");
        return null;
      }

      try {
        const response = await fetch("/api/test-results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userId: session.user.id,
            categoryId: category.id,
            score: results.correct,
            total: results.total,
            percentage: results.percentage,
          }),
        });

        if (!response.ok) throw new Error("テスト結果の保存に失敗しました");
        return await response.json();
      } catch (error) {
        console.error("テスト結果の保存中にエラーが発生しました:", error);
        return null;
      }
    },
    [session, category.id]
  );

  // 結果表示時の処理
  useEffect(() => {
    if (showResults && !results) {
      setResults(calculateResults());
    }
  }, [showResults, results, calculateResults]);

  // 結果保存
  useEffect(() => {
    if (showResults && results && session?.user) {
      saveTestResult(results);
    }
  }, [showResults, results, session, saveTestResult]);

  // 回答の記録
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

  // テスト再開
  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers(Array(tests.length).fill(null));
    setShowResults(false);
    setResults(null);
  };

  // テスト開始
  const startTest = () => setIsStarted(true);

  // 各状態に応じたコンポーネントの表示
  if (shuffledOptions.length === 0) {
    return <TestLoadingState />;
  }

  if (showResults) {
    return (
      <TestResults
        tests={tests}
        category={category}
        answers={answers}
        correctIndices={correctIndices}
        shuffledOptions={shuffledOptions}
        results={calculateResults()}
        session={session}
        onRestart={restartTest}
      />
    );
  }

  if (!isStarted) {
    return (
      <TestIntro
        category={category}
        testCount={tests.length}
        onStart={startTest}
      />
    );
  }

  return (
    <TestQuestions
      currentQuestion={currentQuestion}
      totalQuestions={tests.length}
      question={tests[currentQuestion].question}
      options={shuffledOptions[currentQuestion]}
      selectedAnswer={answers[currentQuestion]}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}
