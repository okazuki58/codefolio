import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BiLogOut, BiArrowBack } from "react-icons/bi";
import SubscriptionSettings from "./components/SubscriptionSettings";
import { DeleteAccountButton } from "./components/DeleteAccountButton";

interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SettingsPage({
  params,
  searchParams,
}: PageProps) {
  await params;
  const resolvedSearchParams = await searchParams;
  const session = await auth();

  // 未ログインの場合はログインページにリダイレクト
  if (!session) {
    redirect("/auth/signin");
  }

  // チェックアウト成功またはメッセージパラメータがある場合の処理
  const checkoutStatus = resolvedSearchParams.checkout;
  const message = resolvedSearchParams.message;

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* チェックアウト成功メッセージ */}
          {checkoutStatus === "success" && (
            <div className="mb-6 p-4 border-l-4 border-green-400 bg-green-50 text-green-800">
              <p className="font-medium">サブスクリプションが開始されました</p>
              <p className="text-sm mt-1">
                プレミアム機能がご利用いただけるようになりました。
              </p>
              <p className="text-sm mt-2">
                GitHub組織への招待メールが送信されました。メールの招待リンクから承認すると、
                プライベートリポジトリへのアクセスが可能になります。
              </p>
              <p className="text-sm mt-1 italic">
                ※招待メールが見つからない場合は、迷惑メールフォルダもご確認ください。
              </p>
            </div>
          )}

          {/* サブスクリプション解約メッセージ */}
          {message === "subscription-cancelled" && (
            <div className="mb-6 p-4 border-l-4 border-amber-400 bg-amber-50 text-amber-800">
              <p className="font-medium">サブスクリプションが解約されました</p>
              <p className="text-sm mt-1">
                有料会員特典は現在期間の終了をもって無効となります。
              </p>
            </div>
          )}

          <h1 className="text-2xl font-bold mb-8">アカウント設定</h1>

          <div className="mb-8">
            <SubscriptionSettings />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
                  通知設定
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">メール通知</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">ブラウザ通知</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
                  アカウント管理
                </h3>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-red-600">ログアウト</h4>
                        <p className="text-sm text-gray-500">
                          このデバイスからログアウトします
                        </p>
                      </div>
                      <Link
                        href="/api/auth/signout"
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center gap-2"
                      >
                        <BiLogOut className="text-lg" />
                        <span>ログアウト</span>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-red-600">
                          アカウント削除
                        </h4>
                        <p className="text-sm text-gray-500">
                          すべてのデータが削除されます
                        </p>
                      </div>
                      <DeleteAccountButton />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-start mt-8">
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1.5"
                >
                  <BiArrowBack />
                  <span>プロフィールに戻る</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
