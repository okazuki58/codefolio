/*
  Warnings:

  - The `answerOptions` column on the `Test` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "answerOptions",
ADD COLUMN     "answerOptions" TEXT[];
