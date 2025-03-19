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
    async jwt({ token, user }) {
      // ユーザーオブジェクトが存在するとき（通常はログイン時のみ）
      if (user) {
        token.id = user.id; // userのIDをトークンに保存
        token.isPaidMember = user.isPaidMember || false; // isPaidMemberをトークンに保存
        token.membershipExpiresAt = user.membershipExpiresAt; // 有効期限をトークンに保存
        token.isGitHubOrgMember = user.isGitHubOrgMember || false; // GitHub組織メンバーステータスをトークンに保存
      }
      return token;
    },
    async session({ session, token, user }) {
      // より堅牢なチェック
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.isPaidMember = (token.isPaidMember as boolean) || false;
        session.user.membershipExpiresAt = token.membershipExpiresAt as
          | string
          | null;
        session.user.isGitHubOrgMember =
          (token.isGitHubOrgMember as boolean) || false;
      } else {
        // DBアダプターを使用している場合はuserからIDを取得できる可能性がある
        if (user?.id) {
          if (!session.user)
            session.user = {
              id: user.id,
              isPaidMember: user.isPaidMember || false,
              isGitHubOrgMember: user.isGitHubOrgMember || false,
            };
          else {
            session.user.id = user.id;
            session.user.isPaidMember = user.isPaidMember || false;
            session.user.membershipExpiresAt = user.membershipExpiresAt;
            session.user.isGitHubOrgMember = user.isGitHubOrgMember || false;
          }
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
