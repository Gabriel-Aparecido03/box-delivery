/*
  Warnings:

  - You are about to drop the column `updated` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "updated",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updated",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
