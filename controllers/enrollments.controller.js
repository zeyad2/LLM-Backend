import prisma from "../prisma/prisma.js";
import jwt from "jsonwebtoken";

export const getEnrollmentRequests = async (req, res, next) => {
  try {
    const enrollments = await prisma.EnrollmentRequest.findMany();

    return res
      .status(200)
      .json({ message: "enrollments found", data: enrollments });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const createEnrollmentRequest = async (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ message: "Unauthorized. please sign in" });

  try {
    const course = await prisma.Course.findUnique({
      where: { id: +req.params.id },
    });
    if (!course) {
      return res.status(404).json({ message: "course not found." });
    }

    const enrollmentExists = await prisma.EnrollmentRequest.findUnique({
      where: {
        student_id_course_id: {
          student_id: req.user.id,
          course_id: +req.params.id,
        },
      },
    });

    if (enrollmentExists) {
      return res.status(409).json({ message: "request already sent" });
    }

    if (req.query == "accept") {
    }
    const enrollment = await prisma.EnrollmentRequest.create({
      data: {
        student_id: req.user.id,
        course_id: +req.params.id,
      },
    });

    return res
      .status(201)
      .json({ message: "Enrollment request Sent", data: enrollment });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

async function createEnrollment(request) {
  return await prisma.Enrollment.create({
    data: {
      student_id: request.student_id,
      course_id: request.course_id,
    },
  });
}

export const handleRequest = async (req, res, next) => {
  try {
    const request = await prisma.EnrollmentRequest.findUnique({
      where: { id: +req.params.id },
    });

    if (!request) {
      return res.status(400).json({ message: "Request Not Found" });
    }

    const { response } = req.query;

    if (response !== "accept" && response !== "reject") {
      return res.status(400).json({ message: "Invalid response value" });
    }

    if (response === "accept") {
      await createEnrollment(request);
      await prisma.EnrollmentRequest.update({
        where: { id: +req.params.id },
        data: { status: "APPROVED" },
      });
      return res.status(201).json({
        message: "enrollment request approved. User is enrolled in course",
      });
    }

    if (response === "reject") {
      await prisma.EnrollmentRequest.update({
        where: { id: +req.params.id },
        data: { status: "REJECTED" },
      });
      return res.status(200).json({ message: "enrollment request rejected" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getEnrollments = async (req, res, next) => {
  try {
    let enrollments;

    if (!req.params.id) {
      enrollments = await prisma.Enrollment.findMany();

      if (enrollments.length === 0) {
        return res.status(200).json({ message: "no students enrolled yet" });
      }
      return res
        .status(200)
        .json({ message: "enrollments found", data: enrollments });
    }

    let course = await prisma.Course.findUnique({
      where: { id: +req.params.id },
    });

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    
    enrollments = await prisma.Enrollment.findMany({
      where: { course_id: +req.params.id },
    });

    if (enrollments.length === 0) {
      return res.status(200).json({ message: "no students enrolled yet" });
    }

    return res
      .status(200)
      .json({ message: "enrollments found", data: enrollments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
