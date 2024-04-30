/*
  Warnings:

  - You are about to drop the column `interestRepayment` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `loanBalance` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `principalRepayment` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "interestRepayment",
DROP COLUMN "loanBalance",
DROP COLUMN "principalRepayment",
ADD COLUMN     "repaymentInfo" JSONB[];
