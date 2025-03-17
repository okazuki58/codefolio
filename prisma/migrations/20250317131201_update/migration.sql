/*
  Warnings:

  - You are about to drop the column `categoryId` on the `TestResult` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_categoryId_fkey";

-- DropIndex
DROP INDEX "TestResult_categoryId_idx";

-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "categoryId";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Question";

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answerOptions" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "correctAnswer" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Test_category_idx" ON "Test"("category");
