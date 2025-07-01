import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeAdmin from "../middlewares/admin.middleware.js";

import {
  getStudentById,
  getProfile,
  getStudents,
  updateStudent,
} from "../controllers/users.controller.js";
const userRouter = Router();

// Specific routes should come before parameterized routes
userRouter.get("/profile", authenticate, getProfile);



//admin only routes
userRouter.get("/:id", authenticate, authorizeAdmin, getStudentById);

userRouter.get("/", authenticate, authorizeAdmin, getStudents);

userRouter.put("/", authenticate, authorizeAdmin, updateStudent);

export default userRouter;
