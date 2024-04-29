-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('MANAGER', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'EMPLOYEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" BIGINT NOT NULL,
    "surname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "civilRegistrationNumber" TEXT NOT NULL,
    "register" TEXT NOT NULL,
    "marriageStatus" TEXT NOT NULL,
    "familyMembers" INTEGER NOT NULL,
    "education" TEXT NOT NULL,
    "employment" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "khoroo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "monthlyIncome" INTEGER NOT NULL,
    "phone" JSONB NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAssetType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "assetTypeId" INTEGER NOT NULL,
    "additionalFields" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubAssetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collateral" (
    "id" BIGINT NOT NULL,
    "ownerId" BIGINT NOT NULL,
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

-- CreateTable
CREATE TABLE "Lend" (
    "id" SERIAL NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "debtorId" BIGINT NOT NULL,
    "interestRate" INTEGER NOT NULL,
    "loanAmount" INTEGER NOT NULL,
    "termOfLoan" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_civilRegistrationNumber_key" ON "Customer"("civilRegistrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_register_key" ON "Customer"("register");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAssetType" ADD CONSTRAINT "SubAssetType_assetTypeId_fkey" FOREIGN KEY ("assetTypeId") REFERENCES "AssetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_assetTypeId_fkey" FOREIGN KEY ("assetTypeId") REFERENCES "AssetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_subAssetTypeId_fkey" FOREIGN KEY ("subAssetTypeId") REFERENCES "SubAssetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lend" ADD CONSTRAINT "Lend_debtorId_fkey" FOREIGN KEY ("debtorId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
