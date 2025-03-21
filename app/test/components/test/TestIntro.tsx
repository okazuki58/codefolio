import Link from "next/link";
import { BiArrowBack, BiCheckCircle, BiPlayCircle } from "react-icons/bi";
import { Category } from "@/types";

interface TestIntroProps {
  category: Category;
  testCount: number;
  onStart: () => void;
}

export function TestIntro({ category, testCount, onStart }: TestIntroProps) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        {category.name} - 理解度テスト
      </h1>

      <div className="mb-8">
        <p className="text-gray-600 mb-3">
          このテストでは、{category.name}に関する{testCount}
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
              <li>• 問題数: {testCount}問</li>
              <li>• 制限時間: なし</li>
              <li>• カテゴリ: {category.name}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Link
          href="/test"
          className="inline-flex items-center justify-center px-5 py-2 rounded-full text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors w-full sm:w-auto"
        >
          <BiArrowBack className="mr-2" />
          カテゴリ一覧に戻る
        </Link>

        <button
          onClick={onStart}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          テストを開始する
          <BiPlayCircle className="ml-2 text-xl" />
        </button>
      </div>
    </div>
  );
}
