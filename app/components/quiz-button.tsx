import { ReactNode, ButtonHTMLAttributes } from "react";

interface QuizButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function QuizButton() {
  return (
    <button className="w-full bg-blue-600 text-white font-bold py-3 rounded mb-6 hover:bg-blue-700 transition-colors">
      理解度チェッククイズに挑戦
    </button>
  );
}
