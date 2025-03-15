import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BiLogOut, BiTrash } from "react-icons/bi";

export default async function SettingsPage() {
  const session = await auth();

  // 未ログインの場合はログインページにリダイレクト
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">アカウント設定</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
              通知設定
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">メール通知</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">ブラウザ通知</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
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
              <div className="p-4 border border-gray-100 rounded-lg">
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

              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-red-600">アカウント削除</h4>
                    <p className="text-sm text-gray-500">
                      すべてのデータが削除されます
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors flex items-center gap-2">
                    <BiTrash className="text-lg" />
                    <span>削除</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center sm:justify-start mt-8">
            <Link
              href="/profile"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← プロフィールに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
