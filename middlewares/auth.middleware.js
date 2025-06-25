import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";
import prisma from "../prisma/prisma.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, envConfig.JWT_SECRET);

    const decodedUser = await prisma.User.findUnique({
      where: { id: decoded.userId },
    });

    if (!decodedUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authorize;
