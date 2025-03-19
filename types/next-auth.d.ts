import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isPaidMember: boolean;
      isGitHubOrgMember?: boolean;
      membershipExpiresAt?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    isPaidMember?: boolean;
    isGitHubOrgMember?: boolean;
    membershipExpiresAt?: string | null;
  }
}
