import prisma from "../prisma/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existingUser = await prisma.User.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "user exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: "STUDENT",
      },
    });

    const token = jwt.sign({ userId: newUser.id }, envConfig.JWT_SECRET, {
      expiresIn: envConfig.JWT_EXPIRES_IN,
    });

    return res.status(201).json({ message: "user created", token, newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "missing fields" });
  }
  try {
    const user = await prisma.User.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign({ userId: user.id }, envConfig.JWT_SECRET, {
      expiresIn: envConfig.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
