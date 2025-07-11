/*
  Warnings:

  - The primary key for the `CourseLesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseId` on the `CourseLesson` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `CourseLesson` table. All the data in the column will be lost.
  - Added the required column `course_id` to the `CourseLesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `CourseLesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CourseLesson` DROP FOREIGN KEY `CourseLesson_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseLesson` DROP FOREIGN KEY `CourseLesson_lessonId_fkey`;

-- DropIndex
DROP INDEX `CourseLesson_lessonId_idx` ON `CourseLesson`;

-- AlterTable
ALTER TABLE `CourseLesson` DROP PRIMARY KEY,
    DROP COLUMN `courseId`,
    DROP COLUMN `lessonId`,
    ADD COLUMN `course_id` INTEGER NOT NULL,
    ADD COLUMN `lesson_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`course_id`, `lesson_id`);

-- CreateIndex
CREATE INDEX `CourseLesson_lesson_id_idx` ON `CourseLesson`(`lesson_id`);

-- AddForeignKey
ALTER TABLE `CourseLesson` ADD CONSTRAINT `CourseLesson_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseLesson` ADD CONSTRAINT `CourseLesson_lesson_id_fkey` FOREIGN KEY (`lesson_id`) REFERENCES `Lesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
