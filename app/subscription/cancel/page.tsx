import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import CancelSubscriptionForm from "./components/CancelSubscriptionForm";

export default async function CancelSubscriptionPage() {
  const session = await auth();

  // 未ログインの場合はログインページにリダイレクト
  if (!session) {
    redirect("/auth/signin");
  }

  // 有料会員でない場合は設定ページにリダイレクト
  if (!session.user.isPaidMember) {
    redirect("/settings?error=not-paid-member");
  }

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            サブスクリプション解約
          </h1>

          <div className="mb-6 p-4 border-l-4 border-amber-400 bg-amber-50 text-amber-800">
            <p className="font-medium">解約前にご確認ください</p>
            <ul className="list-disc ml-5 mt-2 text-sm">
              <li className="mb-1">
                解約すると有料会員特典が即時に無効になります
              </li>
              <li className="mb-1">
                プライベートリポジトリへのアクセスができなくなります
              </li>
              <li>解約後も期間終了まで通常のサービスはご利用いただけます</li>
            </ul>
          </div>

          <CancelSubscriptionForm />
        </div>
      </div>
    </div>
  );
}
