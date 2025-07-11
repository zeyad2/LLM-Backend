-- DropForeignKey
ALTER TABLE `CourseLesson` DROP FOREIGN KEY `CourseLesson_courseId_fkey`;

-- AddForeignKey
ALTER TABLE `CourseLesson` ADD CONSTRAINT `CourseLesson_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
