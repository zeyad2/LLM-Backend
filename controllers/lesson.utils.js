import prisma from "../prisma/prisma.js";

// Normalize courseIds to an array of numbers
export function normalizeCourseIds(courseIds) {
  return (Array.isArray(courseIds) ? courseIds : [courseIds])
    .map((id) => parseInt(id))
    .filter((id) => !isNaN(id));
}

// Create a lesson record in the database
export async function createLessonRecord({ title, drive_link }) {
  return prisma.Lesson.create({
    data: { title, drive_link },
  });
}

// Link a lesson to multiple courses
export async function linkLessonToCourses(lessonId, courseIds) {
  for (const courseId of courseIds) {
    const course = await prisma.Course.findUnique({ where: { id: courseId } });
    if (!course) throw new Error(`Course with id ${courseId} not found`);
    await prisma.CourseLesson.create({
      data: { course_id: courseId, lesson_id: lessonId },
    });
  }
}

// Add PDFs to a lesson
export async function addLessonPdfs(lessonId, files) {
  if (files && Array.isArray(files)) {
    for (const file of files) {
      await prisma.LessonPdf.create({
        data: { lesson_id: lessonId, pdf_path: file.path },
      });
    }
  }
}

// Cleanup uploaded files in case of error
export async function cleanupFiles(files) {
  if (files && Array.isArray(files)) {
    const fs = await import("fs/promises");
    for (const file of files) {
      try {
        await fs.unlink(file.path);
      } catch (err) {
        console.error(`Failed to delete file ${file.path}:`, err);
      }
    }
  }
} 