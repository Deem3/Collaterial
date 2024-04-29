/*
  Warnings:

  - The primary key for the `Lend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Lend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lend" DROP CONSTRAINT "Lend_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Lend_pkey" PRIMARY KEY ("accountNumber");
