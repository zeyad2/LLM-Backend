/*
  Warnings:

  - Added the required column `thumbnail` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` ADD COLUMN `thumbnail` VARCHAR(500) NOT NULL DEFAULT 'default-thumbnail.png';
