-- DropForeignKey
ALTER TABLE `Assessment` DROP FOREIGN KEY `Assessment_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `Enrollment` DROP FOREIGN KEY `Enrollment_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `EnrollmentRequest` DROP FOREIGN KEY `EnrollmentRequest_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_course_id_fkey`;

-- AddForeignKey
ALTER TABLE `EnrollmentRequest` ADD CONSTRAINT `EnrollmentRequest_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assessment` ADD CONSTRAINT `Assessment_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
