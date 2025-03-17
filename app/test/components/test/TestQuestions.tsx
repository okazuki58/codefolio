import Link from "next/link";
import { BiArrowBack, BiRightArrowAlt } from "react-icons/bi";

interface TestQuestionsProps {
  currentQuestion: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function TestQuestions({
  currentQuestion,
  totalQuestions,
  question,
  options,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
}: TestQuestionsProps) {
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
          問題 {currentQuestion + 1} / {totalQuestions}
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-2xl font-bold">{question}</h1>
      </div>

      <div className="space-y-3 mb-8">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedAnswer === index
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
              onClick={onPrevious}
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <BiArrowBack className="mr-1" />
              前の問題
            </button>
          )}
        </div>
        <div>
          <button
            onClick={onNext}
            disabled={selectedAnswer === null}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white transition-colors ${
              selectedAnswer === null
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {currentQuestion < totalQuestions - 1 ? "次へ" : "結果を見る"}
            <BiRightArrowAlt className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
