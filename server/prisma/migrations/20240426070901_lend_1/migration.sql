-- CreateTable
CREATE TABLE "Lend" (
    "id" SERIAL NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "debtorId" TEXT NOT NULL,
    "interestRate" INTEGER NOT NULL,
    "loanAmount" INTEGER NOT NULL,
    "termOfLoan" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lend" ADD CONSTRAINT "Lend_debtorId_fkey" FOREIGN KEY ("debtorId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
