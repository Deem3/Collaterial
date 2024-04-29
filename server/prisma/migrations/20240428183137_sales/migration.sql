-- DropForeignKey
ALTER TABLE "Collateral" DROP CONSTRAINT "Collateral_assetTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Collateral" DROP CONSTRAINT "Collateral_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Collateral" DROP CONSTRAINT "Collateral_subAssetTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Lend" DROP CONSTRAINT "Lend_debtorId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_collateralId_fkey";

-- DropForeignKey
ALTER TABLE "SubAssetType" DROP CONSTRAINT "SubAssetType_assetTypeId_fkey";

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAssetType" ADD CONSTRAINT "SubAssetType_assetTypeId_fkey" FOREIGN KEY ("assetTypeId") REFERENCES "AssetType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_assetTypeId_fkey" FOREIGN KEY ("assetTypeId") REFERENCES "AssetType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_subAssetTypeId_fkey" FOREIGN KEY ("subAssetTypeId") REFERENCES "SubAssetType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_collateralId_fkey" FOREIGN KEY ("collateralId") REFERENCES "Collateral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lend" ADD CONSTRAINT "Lend_debtorId_fkey" FOREIGN KEY ("debtorId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
