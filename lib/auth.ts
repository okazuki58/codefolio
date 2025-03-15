import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // ユーザー情報をトークンに追加する場合はここで処理
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // セッションにトークンの情報を追加
      if (token && session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
};

// サーバーサイドでセッションを取得するためのヘルパー関数
export function auth() {
  return getServerSession(authOptions);
}
