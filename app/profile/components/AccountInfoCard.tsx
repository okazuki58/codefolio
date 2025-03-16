import { BiUser, BiCheckCircle } from "react-icons/bi";
import { Session } from "next-auth";

interface AccountInfoCardProps {
  session: Session;
}

export function AccountInfoCard({ session }: AccountInfoCardProps) {
  return (
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
            <div className="text-sm text-gray-500 mb-1">メールアドレス</div>
            <div className="font-medium">{session.user?.email || "-"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">アカウント連携</div>
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
  );
}
