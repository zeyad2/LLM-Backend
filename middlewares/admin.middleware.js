import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";
import prisma from "../prisma/prisma.js";

const authorizeAdmin = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unathorized. this is an admins only route." });
    }

    const decoded = jwt.verify(token, envConfig.JWT_SECRET);

    const decodedUser = await prisma.User.findUnique({
      where: { id: decoded.userId },
    });

    if (!decodedUser || decodedUser.role !== "ADMIN") {
      return res
        .status(401)
        .json({ message: "Unathorized. this is an admins only route." });
    }

    req.user = decodedUser;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

export default authorizeAdmin;
