import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";
import prisma from "../prisma/prisma.js";

const authenticate = async (req, res, next) => {
  let token;
  req.user = null;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, envConfig.JWT_SECRET);
      const user = await prisma.User.findUnique({
        where: { id: decoded.userId },
      });
      req.user = user || null;
    }
  } catch (error) {
    req.user = null;
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
  next();
};



export default authenticate;
