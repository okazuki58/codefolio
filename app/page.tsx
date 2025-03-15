import Image from "next/image";
import { auth } from "@/lib/auth";
import { BiLogIn } from "react-icons/bi";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Welcome to Next.js
          </h1>

          {session ? (
            // ログイン済みの場合、ユーザー情報を表示
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={`${session.user.name}'s profile`}
                    width={80}
                    height={80}
                    className="rounded-full mb-2"
                  />
                )}
                <h2 className="text-xl font-semibold">{session.user?.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {session.user?.email}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  You are logged in with GitHub
                </p>
                <div className="mt-4 flex justify-center">
                  <Link
                    href="/api/auth/signout"
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // 未ログインの場合、ログインボタンを表示
            <div className="flex flex-col items-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Sign in to get started
              </p>
              <Link
                href="/api/auth/signin"
                className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                <BiLogIn className="text-xl" />
                <span>Sign in with GitHub</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
