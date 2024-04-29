-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "principalRepayment" INTEGER NOT NULL,
    "interestRepayment" INTEGER NOT NULL,
    "loanBalance" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_accountNumber_fkey" FOREIGN KEY ("accountNumber") REFERENCES "Lend"("accountNumber") ON DELETE CASCADE ON UPDATE CASCADE;
