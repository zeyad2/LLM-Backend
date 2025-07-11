/*
  Warnings:

  - You are about to drop the column `course_id` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_course_id_fkey`;

-- DropIndex
DROP INDEX `Lesson_course_id_idx` ON `Lesson`;

-- AlterTable
ALTER TABLE `Lesson` DROP COLUMN `course_id`;

-- CreateTable
CREATE TABLE `CourseLesson` (
    `courseId` INTEGER NOT NULL,
    `lessonId` INTEGER NOT NULL,

    INDEX `CourseLesson_lessonId_idx`(`lessonId`),
    PRIMARY KEY (`courseId`, `lessonId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CourseLesson` ADD CONSTRAINT `CourseLesson_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseLesson` ADD CONSTRAINT `CourseLesson_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
