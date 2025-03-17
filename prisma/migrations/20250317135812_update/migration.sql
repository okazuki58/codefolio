/*
  Warnings:

  - Added the required column `categoryId` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "TestResult_categoryId_idx" ON "TestResult"("categoryId");
