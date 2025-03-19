import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isPaidMember: boolean;
      membershipExpiresAt?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    isPaidMember?: boolean;
    membershipExpiresAt?: string | null;
  }
}
