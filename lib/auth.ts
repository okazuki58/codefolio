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
      // ユーザーオブジェクトが存在するとき（通常はログイン時のみ）
      if (user) {
        token.id = user.id; // userのIDをトークンに保存
      }
      return token;
    },
    async session({ session, token, user }) {
      // より堅牢なチェック
      if (session?.user && token?.id) {
        session.user.id = token.id as string;
      } else {
        // DBアダプターを使用している場合はuserからIDを取得できる可能性がある
        if (user?.id) {
          if (!session.user) session.user = { id: user.id };
          else session.user.id = user.id;
        }
      }
      return session;
    },
  },
};

// サーバーサイドでセッションを取得するためのヘルパー関数
export function auth() {
  return getServerSession(authOptions);
}
