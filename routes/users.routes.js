import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import authorizeAdmin from "../middlewares/admin.middleware.js";

import { getStudentById,getProfile, getStudents } from "../controllers/users.controller.js";
const userRouter = Router();

// Specific routes should come before parameterized routes
userRouter.get("/profile", authorize, getProfile)



//admin only routes
userRouter.get("/:id", authorizeAdmin, getStudentById)

userRouter.get("/", authorizeAdmin, getStudents)


export default userRouter;
