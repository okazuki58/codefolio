import Header from "@/app/components/header";
import Link from "next/link";
import {
  BiTimeFive,
  BiRightArrow,
  BiBookOpen,
  BiCheckCircle,
  BiPencil,
} from "react-icons/bi";

// 記事データの型定義
interface ConceptArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  learningTime: number;
  order: number;
  testStatus?: "completed" | "incomplete" | null; // テスト状態
  testScore?: number; // テスト結果
}

// 記事一覧データ（テスト状態は仮のものです。実際のアプリでは状態管理やAPIから取得）
const articles: ConceptArticle[] = [
  {
    slug: "computer-basics",
    title: "コンピューターの基本と仕組み",
    description:
      "コンピューターの構成要素やOSの役割、プログラムが動作する仕組みまで、基本的な概念を学びます。",
    category: "コンピュータ基礎",
    learningTime: 35,
    order: 1,
    testStatus: "completed",
    testScore: 85,
  },
  {
    slug: "programming-fundamentals",
    title: "プログラミングとは？",
    description:
      "プログラミングの基礎概念やソースコード、言語ごとの特徴など、プログラミングの基本を学びます。",
    category: "プログラミング",
    learningTime: 30,
    order: 2,
    testStatus: "completed",
    testScore: 70,
  },
  {
    slug: "internet-basics",
    title: "インターネットとは？",
    description:
      "インターネットの基本的な仕組みやWebページが表示される仕組み、通信プロトコルについて学びます。",
    category: "コンピュータ基礎",
    learningTime: 30,
    order: 3,
    testStatus: "incomplete",
  },
  {
    slug: "web-fundamentals",
    title: "Webとは何か？ウェブページの構成",
    description:
      "Webの基礎概念、HTML・CSS・JavaScriptの役割、フロントエンドとバックエンドの違いについて学びます。",
    category: "Web開発",
    learningTime: 40,
    order: 4,
  },
  {
    slug: "internet-communication",
    title: "インターネット通信の仕組み",
    description:
      "TCP/IPの基本、HTTPリクエストとレスポンス、ポート番号、DNSの仕組みなど通信技術を詳しく学びます。",
    category: "ネットワーク",
    learningTime: 45,
    order: 5,
  },
  {
    slug: "database-basics",
    title: "データベースの基本概念",
    description:
      "データベースの種類や基本的なSQL操作、アプリケーションとデータベースの連携について学びます。",
    category: "データベース",
    learningTime: 50,
    order: 6,
  },
  {
    slug: "security-basics",
    title: "セキュリティの基本",
    description:
      "Webアプリケーションのセキュリティリスク、攻撃手法、安全な開発のための基本的な対策を学びます。",
    category: "セキュリティ",
    learningTime: 40,
    order: 7,
  },
];

export default function ConceptsPage() {
  // 記事を順番に並べる
  const sortedArticles = [...articles].sort((a, b) => a.order - b.order);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header />

      {/* Page Title */}
      <div className="px-4 sm:px-6 md:px-10 mt-6 md:mt-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          基礎概念
        </h1>
        <p className="mt-2 text-gray-600 max-w-3xl">
          プログラミングを学ぶ前に、コンピューターやインターネットの仕組みなど、基礎的な概念を身につけましょう。
          これらの知識は、あなたのプログラミング学習の土台となります。
        </p>
      </div>

      {/* Articles List */}
      <div className="px-4 sm:px-6 md:px-10 mt-8 mb-20">
        <div className="space-y-6">
          {sortedArticles.map((article) => (
            <div
              key={article.slug}
              className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6"
            >
              {/* 記事情報 */}
              <div className="flex-1">
                <div className="mb-2">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 flex items-center inline-block">
                    <BiTimeFive className="inline mr-1" />
                    {article.learningTime}分
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                    {article.order}
                  </span>
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4">{article.description}</p>

                <Link
                  href={`/concepts/${article.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <BiBookOpen className="mr-1" />
                  <span>記事を読む</span>
                  <BiRightArrow className="ml-1" />
                </Link>
              </div>

              {/* テスト状態 */}
              <div className="w-full md:w-64 flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4">
                {article.testStatus === "completed" ? (
                  <>
                    <div className="flex items-center mb-2 text-green-600">
                      <BiCheckCircle size={24} className="mr-2" />
                      <span className="font-bold">テスト完了</span>
                    </div>
                    <div className="text-3xl font-bold mb-3 text-gray-800">
                      {article.testScore}
                      <span className="text-lg text-gray-500">点</span>
                    </div>
                    <Link
                      href={`/concepts/${article.slug}/test`}
                      className="w-full py-2 bg-white border border-blue-600 text-blue-600 rounded text-center font-medium hover:bg-blue-50"
                    >
                      もう一度挑戦する
                    </Link>
                  </>
                ) : article.testStatus === "incomplete" ? (
                  <>
                    <div className="flex items-center mb-3 text-yellow-600">
                      <BiPencil size={24} className="mr-2" />
                      <span className="font-bold">テスト開始済み</span>
                    </div>
                    <Link
                      href={`/concepts/${article.slug}/test`}
                      className="w-full py-2 bg-blue-600 text-white rounded text-center font-medium hover:bg-blue-700"
                    >
                      テストを続ける
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="text-gray-600 mb-3 text-center">
                      この概念の理解度をチェックしましょう
                    </div>
                    <Link
                      href={`/concepts/${article.slug}/test`}
                      className="w-full py-2 bg-blue-600 text-white rounded text-center font-medium hover:bg-blue-700"
                    >
                      理解度テストに挑戦
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
