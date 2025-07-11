-- DropForeignKey
ALTER TABLE `LessonPdf` DROP FOREIGN KEY `LessonPdf_lesson_id_fkey`;

-- AddForeignKey
ALTER TABLE `LessonPdf` ADD CONSTRAINT `LessonPdf_lesson_id_fkey` FOREIGN KEY (`lesson_id`) REFERENCES `Lesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
