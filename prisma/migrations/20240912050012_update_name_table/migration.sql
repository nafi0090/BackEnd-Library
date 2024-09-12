/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Borrowing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_memberId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_bookId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_memberId_fkey";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "Borrowing";

-- DropTable
DROP TABLE "History";

-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "penaltyEndDate" TIMESTAMP(3),

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "borrowing" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "borrowedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "borrowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "borrowedDate" TIMESTAMP(3),
    "returnedDate" TIMESTAMP(3),

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_code_key" ON "book"("code");

-- CreateIndex
CREATE UNIQUE INDEX "member_code_key" ON "member"("code");

-- CreateIndex
CREATE UNIQUE INDEX "borrowing_bookId_key" ON "borrowing"("bookId");

-- AddForeignKey
ALTER TABLE "borrowing" ADD CONSTRAINT "borrowing_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowing" ADD CONSTRAINT "borrowing_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
