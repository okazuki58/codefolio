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

// 最適化のためのプリフェッチ設定
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function ProfilePage() {
  const session = await auth();

  // 未ログインの場合はログインページにリダイレクト
  if (!session) {
    redirect("/auth/signin");
  }

  // プリロード - バックグラウンドで必要なデータ取得を開始
  void preloadProfileData();

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            マイプロフィール
          </h1>

          <ProfileCard session={session} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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
