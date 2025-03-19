"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiCrown, BiX } from "react-icons/bi";

export default function SubscriptionSettings() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) return null;

  const isPaidMember = session.user.isPaidMember;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        サブスクリプション設定
      </h2>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-medium text-gray-700">現在のプラン:</span>
          {isPaidMember ? (
            <span className="inline-flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full text-sm font-medium">
              <BiCrown className="text-lg" />
              有料会員
            </span>
          ) : (
            <span className="text-gray-600">無料プラン</span>
          )}
        </div>

        {isPaidMember && (
          <p className="text-sm text-gray-600 mb-4">
            あなたは有料会員です。すべての機能とリソースにアクセスできます。
          </p>
        )}
      </div>

      {isPaidMember ? (
        <div>
          <button
            onClick={() => router.push("/subscription/cancel")}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
          >
            <BiX className="text-lg" />
            サブスクリプションを解約する
          </button>
        </div>
      ) : (
        <button
          onClick={() => router.push("/pricing")}
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          有料プランにアップグレード
        </button>
      )}
    </div>
  );
}
