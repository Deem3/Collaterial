-- AlterTable
ALTER TABLE "Collateral" ADD COLUMN     "lendId" INTEGER;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_lendId_fkey" FOREIGN KEY ("lendId") REFERENCES "Lend"("accountNumber") ON DELETE CASCADE ON UPDATE CASCADE;
