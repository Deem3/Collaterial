-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Customer_civilRegistrationNumber_key" ON "Customer"("civilRegistrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_register_key" ON "Customer"("register");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
