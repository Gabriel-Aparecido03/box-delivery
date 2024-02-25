/*
  Warnings:

  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_package_id_fkey";

-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_deliveryman_id_fkey";

-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_recipient_id_fkey";

-- DropTable
DROP TABLE "Attachment";

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_deliveryman_id_fkey" FOREIGN KEY ("deliveryman_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
