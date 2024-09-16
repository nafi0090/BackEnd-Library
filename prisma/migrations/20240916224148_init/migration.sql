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
    "penaltyenddate" TIMESTAMP(3),

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "borrowing" (
    "id" SERIAL NOT NULL,
    "memberid" INTEGER NOT NULL,
    "bookid" INTEGER NOT NULL,
    "borroweddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "borrowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "memberid" INTEGER NOT NULL,
    "bookid" INTEGER NOT NULL,
    "borroweddate" TIMESTAMP(3) NOT NULL,
    "returneddate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_code_key" ON "book"("code");

-- CreateIndex
CREATE UNIQUE INDEX "member_code_key" ON "member"("code");

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
