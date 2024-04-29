/*
  Warnings:

  - The primary key for the `Lend` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Lend" DROP CONSTRAINT "Lend_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Lend_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Lend_id_seq";
