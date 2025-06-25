import prisma from "../prisma/prisma.js";

export const createCourse = async (req, res, next) => {
  const { title } = req.body;

  try {
    if (!title) return res.status(400).json({ message: "Missing fields" });

    const course = await prisma.Course.create({
      data: {
        title: title,
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
