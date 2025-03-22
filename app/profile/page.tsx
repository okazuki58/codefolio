import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileCard } from "./components/ProfileCard";
import { LearningStatusSection } from "./components/LearningStatusSection";
import { SkillsCard } from "./components/SkillsCard";
import { AccountInfoCard } from "./components/AccountInfoCard";
import { Suspense } from "react";
import {
  LearningStatusSkeleton,
  SkillsSkeleton,
  AccountInfoSkeleton,
} from "./components/skeletons";
import { preloadProfileData } from "./actions";

// プロファイルページは認証情報を使うため動的にする必要があるが、
// データフェッチやレンダリングを最適化することで高速化
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const fetchCache = "force-cache"; // データフェッチのキャッシュを強制

export default async function ProfilePage() {
  const session = await auth();

  // 未ログインの場合はログインページにリダイレクト
  if (!session) {
    redirect("/auth/signin");
  }

  // Promise.allを使わずに単一のpreloadProfileDataを呼び出す
  // これによりactionsで定義された並列データ取得を使う
  await preloadProfileData();

  // データの先読み完了 - この時点でデータはキャッシュ済み

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            マイプロフィール
          </h1>

          {/* セッション情報は即時表示 */}
          <ProfileCard session={session} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Suspenseでラップすることで部分的なストリーミングを実現 */}
            <Suspense fallback={<LearningStatusSkeleton />}>
              <LearningStatusSection />
            </Suspense>
            <Suspense fallback={<SkillsSkeleton />}>
              <SkillsCard />
            </Suspense>
          </div>

          <Suspense fallback={<AccountInfoSkeleton />}>
            <AccountInfoCard session={session} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
