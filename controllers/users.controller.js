import prisma from "../prisma/prisma.js";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";

export const getStudentById = async (req, res, next) => {
  try {
    const authenticatedUser = req.user;

    const user = await prisma.User.findUnique({
      where: { id: +req.params.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const authenticatedUser = req.user;
    const { name } = req.query;

    if (authenticatedUser.role !== "ADMIN") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let users;
    if (name) {
      users = await prisma.User.findMany({
        where: { name: { contains: name } },
      });
    } else {
      users = await prisma.User.findMany();
    }

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ message: "Users found", data: users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res, next) => {
  const authenticatedUser = req.user;
  try {
    const user = await prisma.User.findUnique({
      where: { id: authenticatedUser.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found", data: user });

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
