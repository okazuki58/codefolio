"use client";

import Link from "next/link";
import { useState } from "react";
import { BiRightArrowAlt, BiInfoCircle } from "react-icons/bi";
import { useSession } from "next-auth/react";

interface PricingFeature {
  text: string;
  included: boolean;
  info?: string;
}

interface PricingPlanProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  ctaText: string;
  ctaLink: string | null;
  popular?: boolean;
  priceId?: string;
}

function PricingPlan({
  title,
  description,
  price,
  period,
  features,
  ctaText,
  ctaLink,
  popular = false,
  priceId,
}: PricingPlanProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // 現在のプランかどうかチェック (プロプランの場合のみ)
  const isCurrentPlan =
    priceId && session?.user?.isPaidMember && title === "プロフェッショナル";

  const handleClick = async (e: React.MouseEvent) => {
    // Stripe決済が必要なプランの場合
    if (priceId && !isCurrentPlan && session) {
      e.preventDefault();
      setIsLoading(true);

      try {
        const response = await fetch("/api/subscription/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId }),
        });

        const { url } = await response.json();
        if (url) window.location.href = url;
      } catch (error) {
        console.error("チェックアウトエラー:", error);
      } finally {
        setIsLoading(false);
      }
    }
    // 未ログインユーザーの場合は直接ログインページへ遷移させる
    else if (!session && ctaLink && ctaLink.includes("/auth/signin")) {
      e.preventDefault();
      window.location.href = ctaLink;
    }
  };

  return (
    <div className={`relative`}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            人気プラン
          </span>
        </div>
      )}

      <div
        className={`
        h-full p-6 rounded-lg 
        flex flex-col
        ${popular ? "border-2 border-blue-600" : "border border-gray-200"}
      `}
      >
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-500 ml-1">{period}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6 flex-1">
          {features.map((feature, index) => (
            <div key={index} className="flex">
              <div className="w-6 shrink-0">
                {feature.included ? (
                  <span className="text-blue-600">✓</span>
                ) : (
                  <span className="text-gray-300">✕</span>
                )}
              </div>
              <div className="flex-1">
                <span
                  className={
                    feature.included ? "text-gray-700" : "text-gray-400"
                  }
                >
                  {feature.text}
                </span>
                {feature.info && (
                  <button className="inline-flex ml-1 text-gray-400 hover:text-gray-500">
                    <BiInfoCircle className="text-sm" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href={ctaLink || ""}
            onClick={handleClick}
            className={`
              w-full py-3 px-4 rounded-lg font-medium
              flex items-center justify-center
              transition-colors
              ${
                isCurrentPlan
                  ? "bg-green-100 text-green-700" // 現在のプラン
                  : popular
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }
              ${isLoading ? "opacity-70 cursor-wait" : ""}
            `}
          >
            {isLoading ? "処理中..." : isCurrentPlan ? "現在のプラン" : ctaText}
            {!isLoading && !isCurrentPlan && (
              <BiRightArrowAlt className="ml-1" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const { data: session } = useSession();

  const pricingPlans = [
    {
      title: "ベーシック",
      description: "個人学習者向けの基本的な機能が利用できるプラン",
      price: "無料",
      period: "永久",
      features: [
        { text: "基礎学習コンテンツ", included: true },
        { text: "基本的な理解度テスト", included: true },
        { text: "月5回までの練習問題", included: true },
        { text: "コミュニティアクセス", included: true },
        { text: "GitHubリポジトリ連携", included: false },
        { text: "プロジェクト評価", included: false },
        { text: "パーソナルコーチング", included: false },
      ],
      ctaText: "無料で始める",
      ctaLink: session ? "/profile" : "/auth/register",
    },
    {
      title: "プロフェッショナル",
      description: "より高度な学習と実践のためのプラン",
      price: "¥1,280",
      period: "/月",
      features: [
        { text: "全ての基礎学習コンテンツ", included: true },
        { text: "全ての理解度テスト", included: true },
        { text: "無制限の練習問題", included: true },
        { text: "プライオリティコミュニティアクセス", included: true },
        { text: "GitHubリポジトリ連携", included: true },
        { text: "月3回までのプロジェクト評価", included: true },
        {
          text: "パーソナルコーチング",
          included: false,
          info: "別途料金が必要です",
        },
      ],
      ctaText: !session
        ? "ログインが必要です"
        : session.user.isPaidMember
        ? "現在のプラン"
        : "プロプランを選択",
      ctaLink: !session
        ? "/auth/signin?callbackUrl=/settings&plan=pro"
        : session.user.isPaidMember
        ? null // すでにプロプランならリンクなし
        : "/settings?plan=pro",
      popular: true,
      priceId: "price_1R4SnjLXAsdrWMMSu7v9yj4c", // Stripeの価格ID
    },
    {
      title: "エンタープライズ",
      description: "チームや企業向けのカスタマイズ可能なプラン",
      price: "要問合せ",
      period: "",
      features: [
        { text: "全てのコンテンツへのアクセス", included: true },
        { text: "カスタムテスト作成", included: true },
        { text: "チーム向け進捗管理", included: true },
        { text: "専用サポートチャンネル", included: true },
        { text: "複数GitHubリポジトリ連携", included: true },
        { text: "無制限のプロジェクト評価", included: true },
        { text: "専属コーチングとメンタリング", included: true },
      ],
      ctaText: "お問い合わせ",
      ctaLink: "/contact",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            料金プラン
          </div>
          <h2 className="text-3xl font-bold mb-6">
            あなたに<span className="text-blue-600">最適な</span>プランを選択
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            どのスキルレベルにも対応した柔軟な料金プランをご用意しています
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingPlan key={index} {...plan} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            すべてのプランは14日間の返金保証付きです。ご不明な点は
            <Link
              href="/contact"
              className="text-blue-600 hover:underline mx-1"
            >
              お問い合わせ
            </Link>
            ください。
          </p>
        </div>
      </div>
    </section>
  );
}
