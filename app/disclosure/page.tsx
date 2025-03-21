import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | コードマスタリー",
  description: "コードマスタリーの特定商取引法に基づく表記です。",
};

export default function DisclosurePage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">特定商取引法に基づく表記</h1>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top w-1/3">
                  販売事業者
                </th>
                <td className="py-4 px-2">codefolio株式会社</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  所在地
                </th>
                <td className="py-4 px-2">
                  〒106-0032
                  <br />
                  東京都港区六本木7-18-13 シークエル六本木4階
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  電話番号
                </th>
                <td className="py-4 px-2">
                  080-5722-3629
                  <br />
                  （受付時間：平日10:00〜18:00 土日祝日・年末年始を除く）
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  メールアドレス
                </th>
                <td className="py-4 px-2">
                  <a
                    href="mailto:support@codefolio.jp"
                    className="text-blue-600 hover:underline"
                  >
                    support@codefolio.jp
                  </a>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  運営統括責任者
                </th>
                <td className="py-4 px-2">小川 一季</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  追加料金
                </th>
                <td className="py-4 px-2">
                  <p>表示価格は全て税込みです。</p>
                  <p>
                    プログラミング学習サービスの利用にあたり、インターネット接続料金などの通信費はお客様のご負担となります。
                  </p>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  交換・返品・キャンセルについて
                </th>
                <td className="py-4 px-2">
                  <p className="font-semibold mb-2">＜お客様都合による返金＞</p>
                  <p className="mb-4">
                    サービス開始から14日以内であれば、全額返金いたします。14日を過ぎた場合、返金はいたしかねますのでご了承ください。返金をご希望の場合は、サポート（support@codefolio.jp）までご連絡ください。
                  </p>

                  <p className="font-semibold mb-2">
                    ＜サービス不具合による返金＞
                  </p>
                  <p>
                    当社の責任によるサービス提供の不具合が発生した場合は、状況に応じて返金対応いたします。不具合を発見された場合は、すみやかにサポートまでご連絡ください。
                  </p>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  サービス提供時期
                </th>
                <td className="py-4 px-2">
                  お申し込み完了後、すぐにサービスをご利用いただけます。
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  決済方法
                </th>
                <td className="py-4 px-2">
                  クレジットカード（VISA、Mastercard、American
                  Express、JCB、Diners Club、Discover）
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  支払い時期
                </th>
                <td className="py-4 px-2">
                  サブスクリプションのお申し込み時に即時決済されます。以降は契約更新日に自動的に決済されます。
                </td>
              </tr>
              <tr>
                <th className="py-4 px-2 text-left font-semibold text-gray-700 align-top">
                  価格
                </th>
                <td className="py-4 px-2">
                  <p>各プランの価格は以下の通りです（税込）：</p>
                  <ul className="list-disc ml-5 mt-2">
                    <li>ベーシックプラン：無料</li>
                    <li>プロフェッショナルプラン：月額¥1,280（税込）</li>
                    <li>エンタープライズプラン：お問い合わせください</li>
                  </ul>
                  <p className="mt-2">
                    <Link
                      href="/pricing"
                      className="text-blue-600 hover:underline"
                    >
                      料金プランの詳細はこちら
                    </Link>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
