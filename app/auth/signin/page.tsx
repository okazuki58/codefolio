"use client";

import { signIn } from "next-auth/react";
import { BiLogoGithub } from "react-icons/bi";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">ログイン</h1>
          <p className="mt-2 text-gray-600">アカウントにログインしてください</p>
        </div>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
          <BiLogoGithub className="h-5 w-5" />
          <span>GitHubでログイン</span>
        </button>
      </div>
    </div>
  );
}
