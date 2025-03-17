import { Category } from "@/types";
import { Session } from "next-auth";

// テスト関連の型定義をここに集約
export interface TestData {
  id: string;
  question: string;
  answerOptions: any;
  category: string;
  correctAnswer: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestResult {
  correct: number;
  total: number;
  percentage: number;
}

export interface TestSessionProps {
  tests: TestData[];
  category: Category;
}

export interface TestResultsProps {
  tests: TestData[];
  category: Category;
  answers: (number | null)[];
  correctIndices: number[];
  shuffledOptions: string[][];
  results: TestResult;
  session: Session | null;
  onRestart: () => void;
}
