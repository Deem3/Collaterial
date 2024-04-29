-- CreateTable
CREATE TABLE "Sales" (
    "id" BIGINT NOT NULL,
    "amountSold" BIGINT NOT NULL,
    "soldDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);
