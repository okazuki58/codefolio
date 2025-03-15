import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BiCog,
  BiGitBranch,
  BiUser,
  BiBookOpen,
  BiCode,
  BiCheckCircle,
} from "react-icons/bi";

export default async function ProfilePage() {
  const session = await auth();

  // 未ログインの場合はログインページにリダイレクト
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            マイプロフィール
          </h1>

          {/* プロフィールカード */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
            <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-50">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "プロフィール画像"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                    <BiUser className="text-3xl text-blue-400" />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {session.user?.name || "ユーザー"}
                </h2>
                <p className="text-gray-500">{session.user?.email || ""}</p>
                <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center">
                    <BiGitBranch className="mr-1" />
                    GitHub連携済み
                  </span>
                </div>
              </div>

              <Link
                href="/settings"
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-lg border border-gray-100 hover:border-gray-200 text-sm"
              >
                <BiCog />
                <span>設定</span>
              </Link>
            </div>
          </div>

          {/* 学習状況 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="col-span-1 lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-100 h-full">
                <div className="p-5 border-b border-gray-50">
                  <h3 className="font-medium text-gray-800 flex items-center">
                    <BiBookOpen className="mr-2 text-blue-500" />
                    学習状況
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">0</div>
                      <div className="text-sm text-gray-600 mt-1">
                        完了した学習
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">0</div>
                      <div className="text-sm text-gray-600 mt-1">
                        解いた問題
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">0%</div>
                      <div className="text-sm text-gray-600 mt-1">
                        平均正答率
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-50">
                    <div className="text-sm text-gray-500 mb-3">
                      最近の学習活動がありません
                    </div>
                    <Link
                      href="/blog"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                    >
                      学習を始める
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 h-full">
                <div className="p-5 border-b border-gray-50">
                  <h3 className="font-medium text-gray-800 flex items-center">
                    <BiCode className="mr-2 text-blue-500" />
                    スキル
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-gray-500">
                      まだスキルが登録されていません
                    </div>
                    <div className="text-sm text-gray-500">
                      学習を完了するとスキルが追加されます
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* アカウント情報 */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50">
              <h3 className="font-medium text-gray-800 flex items-center">
                <BiUser className="mr-2 text-blue-500" />
                アカウント情報
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">名前</div>
                  <div className="font-medium">{session.user?.name || "-"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    メールアドレス
                  </div>
                  <div className="font-medium">
                    {session.user?.email || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    アカウント連携
                  </div>
                  <div className="flex items-center">
                    <BiCheckCircle className="text-green-500 mr-1.5" />
                    <span>GitHub</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">登録日</div>
                  <div className="font-medium">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
