/*
  Warnings:

  - You are about to drop the column `bookId` on the `borrowing` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `borrowing` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `history` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookid]` on the table `borrowing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookid` to the `borrowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberid` to the `borrowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookid` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberid` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "borrowing" DROP CONSTRAINT "borrowing_bookId_fkey";

-- DropForeignKey
ALTER TABLE "borrowing" DROP CONSTRAINT "borrowing_memberId_fkey";

-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_bookId_fkey";

-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_memberId_fkey";

-- DropIndex
DROP INDEX "borrowing_bookId_key";

-- AlterTable
ALTER TABLE "borrowing" DROP COLUMN "bookId",
DROP COLUMN "memberId",
ADD COLUMN     "bookid" INTEGER NOT NULL,
ADD COLUMN     "memberid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "history" DROP COLUMN "bookId",
DROP COLUMN "memberId",
ADD COLUMN     "bookid" INTEGER NOT NULL,
ADD COLUMN     "memberid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "borrowing_bookid_key" ON "borrowing"("bookid");

-- AddForeignKey
ALTER TABLE "borrowing" ADD CONSTRAINT "borrowing_memberid_fkey" FOREIGN KEY ("memberid") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowing" ADD CONSTRAINT "borrowing_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_memberid_fkey" FOREIGN KEY ("memberid") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
