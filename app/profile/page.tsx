import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BiCog, BiGitBranch, BiUser } from "react-icons/bi";

export default async function ProfilePage() {
  const session = await auth();

  // 未ログインの場合はログインページにリダイレクト
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">マイプロフィール</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* プロフィールヘッダー */}
        <div className="bg-blue-50 p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "プロフィール画像"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <BiUser className="text-3xl text-gray-400" />
              </div>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold">
              {session.user?.name || "ユーザー"}
            </h2>
            <p className="text-gray-600">{session.user?.email || ""}</p>
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center">
                <BiGitBranch className="mr-1" />
                GitHub連携済み
              </span>
            </div>
          </div>
        </div>

        {/* プロフィール情報 */}
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
              アカウント情報
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-sm text-gray-500 sm:w-32">名前:</span>
                <span>{session.user?.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-sm text-gray-500 sm:w-32">
                  メールアドレス:
                </span>
                <span>{session.user?.email}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
              学習状況
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600">完了した学習</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600">解いた問題</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0%</div>
                <div className="text-sm text-gray-600">平均正答率</div>
              </div>
            </div>
          </div>

          {/* 設定へのリンク */}
          <div className="flex justify-center sm:justify-end mt-8">
            <Link
              href="/settings"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <BiCog className="text-lg" />
              <span>アカウント設定</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
