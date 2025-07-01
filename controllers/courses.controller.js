import prisma from "../prisma/prisma.js";
import multer from "multer";
const upload = multer({ dest: "/uploads/" });

export const createCourse = async (req, res, next) => {
  const { title } = req.body;
  const thumbnailFile = req.file;

  try {
    if (!title || !thumbnailFile) {
      return res
        .status(400)
        .json({ message: "Missing fields: title and thumbnail are required" });
    }

    const course = await prisma.Course.create({
      data: {
        title: title,
        thumbnail: thumbnailFile.path, // store the relative path
      },
    });

    return res
      .status(201)
      .json({ message: "course created successfully", course });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//get all courses
export const getCourses = async (req, res, next) => {
  try {
    const courses = await prisma.Course.findMany();

    return res.status(200).json({ message: "courses found", data: courses });
  } catch (error) {
    console.error();
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//user route returns public details if not enrolled else returns full course
export const getCourseById = async (req, res, next) => {
  try {
    let course;
    if (!req.user) {
      course = await prisma.Course.findUnique({
        where: { id: +req.params.id },
        select: {
          title: true,
          thumbnail: true,
        },
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      return res.status(200).json({ message: "course found", data: course });
    }

    const authenticatedUser = req.user;

    //check if enrolled
    let enrolledUser;

    enrolledUser = await prisma.Enrollment.findUnique({
      where: {
        student_id_course_id: {
          student_id: authenticatedUser.id,
          course_id: +req.params.id,
        },
      },
    });

    if (!enrolledUser) {
      course = await prisma.Course.findUnique({
        where: { id: +req.params.id },
        select: {
          title: true,
          thumbnail: true,
        },
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      return res.status(200).json({ message: "course found", data: course });
    }

    course = await prisma.Course.findUnique({
      where: { id: +req.params.id },
      include: {
        lessons: true,
        assesments: true,
      },
    });

    return res.status(200).json({ message: "Course found", data: course });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const updateCourse = async (req, res, next) => {
  const { title, thumbnail, description, is_archived } = req.body;

  const newCourseData = {};

  if (title != undefined) {
    newCourseData.title = title;
  }

  if (thumbnail != undefined) {
    newCourseData.thumbnail = thumbnail;
  }

  if (description != undefined) {
    newCourseData.description = description;
  }

  if (is_archived != undefined) {
    newCourseData.is_archived = is_archived;
  }

  const course = await prisma.Course.findUnique({
    where: { id: +req.params.id },
  });

  if (!course) {
    return res.status(404).json({ message: "No Course found" });
  }

  await prisma.Course.update({});
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await prisma.Course.findUnique({
      where: { id: +req.params.id },
    });

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    await prisma.Course.delete({
      where: { id: +req.params.id },
    });
    return res.status(200).json({ message: "course deleted" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
