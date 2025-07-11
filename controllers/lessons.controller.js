import prisma from "../prisma/prisma.js";
import multer from "multer";
import {
  normalizeCourseIds,
  createLessonRecord,
  linkLessonToCourses,
  addLessonPdfs,
  cleanupFiles,
} from "./lesson.utils.js";

const upload = multer({ dest: "uploads/" });

export const createLesson = async (req, res, next) => {
  const { title, courseIds, drive_link } = req.body;
  const lessonFiles = req.files;

  const normalizedCourseIds = normalizeCourseIds(courseIds);

  if (normalizedCourseIds.length === 0) {
    return res.status(400).json({ message: "No valid course IDs provided" });
  }

  try {
    // Create the lesson
    const lesson = await createLessonRecord({ title, drive_link });

    // Link lesson to courses
    await linkLessonToCourses(lesson.id, normalizedCourseIds);

    // Add PDFs if any
    await addLessonPdfs(lesson.id, lessonFiles);

    res.status(201).json({ message: "Lesson created successfully", lesson });
  } catch (error) {
    // Delete uploaded files if there was an error
    await cleanupFiles(lessonFiles);
    if (error.message === "course not found") {
      return res.status(404).json({ message: "course not found" });
    }
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create lesson", error: error.message });
  }
};

export const getLessons = async (req, res, next) => {
  try {
    if (req.params.id) {
      // Get lessons for a specific course
      const courseLessons = await prisma.CourseLesson.findMany({
        where: { course_id: +req.params.id },
        include: { lesson: { include: { pdfs: true } } },
      });
      const lessons = courseLessons.map((cl) => cl.lesson);
      return res
        .status(200)
        .json({ message: "Course lessons found", data: lessons });
    }
    // Get all lessons
    const lessons = await prisma.Lesson.findMany({ include: { pdfs: true } });
    return res
      .status(200)
      .json({ message: "All lessons found", data: lessons });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

export const addLessonToCourse = async (req, res, next) => {
    try{
        const {course_id, lesson_id} = req.body;
        const course = await prisma.Course.findUnique({
            where: {id: course_id}
        })
        if (!course) {
            return res.status(400).json({message: "course not found"})
        }
        const lesson = await prisma.Lesson.findUnique({
            where: {id: lesson_id}
        })
        if (!lesson) {
            return res.status(400).json({message: "lesson not found"})
        }
        await prisma.CourseLesson.create({
            data: {
                course_id: course_id,
                lesson_id: lesson_id
            }
        })
        return res.status(200).json({message: "lesson added to course"})

    }   catch(error){
        console.error(error);
        return res.status(500).json({message: "server error", error: error.message});
    }
};

export const removeLessonFromCourse = async (req, res, next) => {
    try{
        const {course_id, lesson_id} = req.body;
        await prisma.CourseLesson.delete({
            where: {course_id_lesson_id: {course_id, lesson_id}}
        })
        return res.status(200).json({message: "lesson removed from course"})
    }   catch(error){
        console.error(error);
        return res.status(500).json({message: "server error", error: error.message});
    }
}


export const deleteAllLessons = async (req, res, next) => {
    try{
        await prisma.CourseLesson.deleteMany();
        await prisma.LessonPdf.deleteMany();
        await prisma.Lesson.deleteMany();
        return res.status(200).json({message: "all lessons deleted"})
    }   catch(error){
        console.error(error);
        return res.status(500).json({message: "server error", error: error.message});
    }
}




//remove lessonFrom course
