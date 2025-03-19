import { Metadata } from "next";
import { PricingSection } from "../components/pricing-section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "料金プラン | コードマスタリー",
  description:
    "初心者から上級者まで、あらゆるレベルの学習者に対応した柔軟な料金プランをご用意しています。",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* ヒーローセクション */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            シンプルで<span className="text-blue-600">透明な</span>料金体系
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            あなたの学習目標に合わせて、最適なプランをお選びいただけます。
            いつでも簡単にプランの変更が可能です。
          </p>
        </div>
      </div>

      {/* 料金表セクション */}
      <PricingSection />

      {/* よくある質問セクション */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">よくある質問</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                支払い方法は何がありますか？
              </h3>
              <p className="text-gray-600">
                クレジットカード（Visa、Mastercard、American
                Express）または銀行振込でお支払いいただけます。月額プランはクレジットカードのみとなります。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                途中でプランを変更できますか？
              </h3>
              <p className="text-gray-600">
                はい、いつでもプランのアップグレードまたはダウングレードが可能です。変更は即時反映され、日割り計算で調整されます。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                返金ポリシーについて教えてください
              </h3>
              <p className="text-gray-600">
                すべての有料プランには14日間の返金保証が付いています。サービスにご満足いただけない場合は、14日以内にご連絡いただければ全額返金いたします。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                エンタープライズプランのカスタマイズについて
              </h3>
              <p className="text-gray-600">
                エンタープライズプランはお客様の組織のニーズに合わせて完全にカスタマイズ可能です。専任のアカウントマネージャーがサポートいたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">今すぐ学習を始めましょう</h2>
          <p className="text-xl text-gray-600 mb-8">
            14日間の返金保証付き。リスクなしでサービスをお試しいただけます。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              無料で始める
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              詳細を問い合わせる
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
