/*
  Warnings:

  - You are about to drop the column `contact_id` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `bank_account_id` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_contact_id_fkey";

-- DropIndex
DROP INDEX "bank_accounts_contact_id_key";

-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "contact_id";

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "bank_account_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
