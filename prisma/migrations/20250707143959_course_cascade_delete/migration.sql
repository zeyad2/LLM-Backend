-- DropForeignKey
ALTER TABLE `CourseLesson` DROP FOREIGN KEY `CourseLesson_lessonId_fkey`;

-- AddForeignKey
ALTER TABLE `CourseLesson` ADD CONSTRAINT `CourseLesson_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
