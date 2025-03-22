import Image from "next/image";
import Link from "next/link";
import { BiCog, BiGitBranch, BiUser, BiCrown } from "react-icons/bi";
import { Session } from "next-auth";

interface ProfileCardProps {
  session: Session;
}

export function ProfileCard({ session }: ProfileCardProps) {
  const isPaidMember = session.user?.isPaidMember || false;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
      <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-50">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "プロフィール画像"}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 96px, 96px"
              loading="eager"
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
          <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center">
              <BiGitBranch className="mr-1" />
              GitHub連携済み
            </span>

            {isPaidMember && (
              <span className="text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full flex items-center">
                <BiCrown className="mr-1" />
                Pro会員
              </span>
            )}

            {session.user?.isGitHubOrgMember && (
              <span className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full flex items-center">
                <BiGitBranch className="mr-1" />
                組織メンバー
              </span>
            )}
          </div>
        </div>

        <Link
          href="/settings"
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-lg border border-gray-100 hover:border-gray-200 text-sm"
          prefetch={true}
        >
          <BiCog />
          <span>設定</span>
        </Link>
      </div>
    </div>
  );
}
