/*
  Warnings:

  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `collateralId` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_pkey",
ADD COLUMN     "collateralId" BIGINT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_collateralId_fkey" FOREIGN KEY ("collateralId") REFERENCES "Collateral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
