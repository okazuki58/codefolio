-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPaidMember" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "membershipExpiresAt" TIMESTAMP(3);
