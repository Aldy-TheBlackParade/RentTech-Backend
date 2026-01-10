/*
  Warnings:

  - You are about to drop the column `product_name` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category_name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_code]` on the table `items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `items` DROP COLUMN `product_name`,
    ADD COLUMN `item_name` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `categories_category_name_key` ON `categories`(`category_name`);

-- CreateIndex
CREATE UNIQUE INDEX `items_item_code_key` ON `items`(`item_code`);
