-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `username` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NULL,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `alamat` VARCHAR(255) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NULL,
    `product_name` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `rental_price` INTEGER NULL,
    `stock` INTEGER NULL,
    `status` ENUM('Tersedia', 'Disewa') NOT NULL DEFAULT 'Tersedia',
    `image_url` VARCHAR(255) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `rental_date` DATE NULL,
    `return_date` DATE NULL,
    `status` ENUM('Keranjang', 'Tertunda', 'Disewa', 'Selesai', 'Dibatalkan') NOT NULL DEFAULT 'Keranjang',
    `subtotal` INTEGER NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NULL,
    `order_id` INTEGER NULL,
    `duration` INTEGER NULL,
    `quantity` INTEGER NULL,
    `price` INTEGER NULL,
    `subtotal` INTEGER NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
