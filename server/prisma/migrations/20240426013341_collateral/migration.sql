-- CreateTable
CREATE TABLE "Collateral" (
    "id" SERIAL NOT NULL,
    "ownerId" TEXT NOT NULL,
    "assetTypeId" INTEGER NOT NULL,
    "subAssetTypeId" INTEGER NOT NULL,
    "collateralName" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "depositAmount" INTEGER NOT NULL,
    "marketValue" INTEGER NOT NULL,
    "dateOfAssessment" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "additionalFields" JSONB NOT NULL,

    CONSTRAINT "Collateral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_assetTypeId_fkey" FOREIGN KEY ("assetTypeId") REFERENCES "AssetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_subAssetTypeId_fkey" FOREIGN KEY ("subAssetTypeId") REFERENCES "SubAssetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
