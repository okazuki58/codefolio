"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Test, Category } from "@/types";
import { TestIntro } from "./test/TestIntro";
import { TestQuestions } from "./test/TestQuestions";
import { TestResults } from "./test/TestResults";
import { TestLoadingState } from "./test/TestLoadingState";

interface TestSessionProps {
  tests: Test[];
  category: Category;
}

// 結果の型を定義
interface TestResult {
  correct: number;
  total: number;
  percentage: number;
}

export function TestSession({ tests, category }: TestSessionProps) {
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

  // Fisher-Yatesシャッフルアルゴリズムを実装
  const fisherYatesShuffle = useCallback(<T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      // 0からiまでのランダムなインデックスを生成
      const j = Math.floor(Math.random() * (i + 1));
      // 要素を交換
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // テストの初期化
  useEffect(() => {
    const initialShuffledOptions: string[][] = [];
    const initialCorrectIndices: number[] = [];

    tests.forEach((test) => {
      const options = test.answerOptions.split(",");
      const correctOption = options[0]; // 最初が正解

      // Fisher-Yatesアルゴリズムでシャッフル
      const shuffled = fisherYatesShuffle(options);
      initialShuffledOptions.push(shuffled);

      // シャッフル後の正解のインデックス
      initialCorrectIndices.push(shuffled.indexOf(correctOption));
    });

    setShuffledOptions(initialShuffledOptions);
    setCorrectIndices(initialCorrectIndices);
  }, [tests, fisherYatesShuffle]);

  // 結果を計算（useCallbackでメモ化）
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

  // テスト結果保存用関数（useCallbackでメモ化）
  const saveTestResult = useCallback(
    async (results: { correct: number; total: number; percentage: number }) => {
      if (!session?.user) {
        console.log(
          "ユーザーがログインしていないため、テスト結果は保存されません"
        );
        return null;
      }

      try {
        const response = await fetch("/api/test-results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: session.user.id,
            categoryId: category.id,
            score: results.correct,
            total: results.total,
            percentage: results.percentage,
          }),
        });

        if (!response.ok) {
          throw new Error("テスト結果の保存に失敗しました");
        }

        return await response.json();
      } catch (error) {
        console.error("テスト結果の保存中にエラーが発生しました:", error);
        return null;
      }
    },
    [session, category.id]
  );

  // 結果が表示される時に一度だけ実行
  useEffect(() => {
    if (showResults && !results) {
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
    }
  }, [showResults, results, calculateResults]);

  // 結果を保存する（ログイン時のみ）
  useEffect(() => {
    if (showResults && results && session?.user) {
      saveTestResult(results);
    }
  }, [showResults, results, session, saveTestResult]);

  // 回答を記録
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  // handleNext関数を修正
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
  };

  // テスト開始
  const startTest = () => {
    setIsStarted(true);
  };

  // 問題が読み込まれていなければローディング表示
  if (shuffledOptions.length === 0) {
    return <TestLoadingState />;
  }

  // テスト結果表示
  if (showResults) {
    const calculatedResults = calculateResults();
    return (
      <TestResults
        tests={tests}
        category={category}
        answers={answers}
        correctIndices={correctIndices}
        shuffledOptions={shuffledOptions}
        results={calculatedResults}
        session={session}
        onRestart={restartTest}
      />
    );
  }

  // テスト開始前の画面
  if (!isStarted) {
    return (
      <TestIntro
        category={category}
        testCount={tests.length}
        onStart={startTest}
      />
    );
  }

  // テスト問題表示
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
