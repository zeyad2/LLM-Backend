/*
  Warnings:

  - You are about to drop the column `pdf_path` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Lesson` DROP COLUMN `pdf_path`;

-- CreateTable
CREATE TABLE `LessonPdf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lesson_id` INTEGER NOT NULL,
    `pdf_path` VARCHAR(512) NOT NULL,

    INDEX `LessonPdf_lesson_id_idx`(`lesson_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LessonPdf` ADD CONSTRAINT `LessonPdf_lesson_id_fkey` FOREIGN KEY (`lesson_id`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
