import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface QuizButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  categoryId?: string;
}

export default function QuizButton({ categoryId }: QuizButtonProps) {
  const quizUrl = categoryId ? `/test/category/${categoryId}` : "/test";

  return (
    <Link href={quizUrl} className="block w-full">
      <button className="w-full bg-blue-600 text-white font-bold py-3 rounded mb-6 hover:bg-blue-700 transition-colors">
        理解度チェッククイズに挑戦
      </button>
    </Link>
  );
}
