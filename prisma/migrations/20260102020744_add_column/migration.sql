-- AlterTable
ALTER TABLE `categories` ADD COLUMN `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `items` ADD COLUMN `item_code` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `image_url` VARCHAR(255) NULL;
