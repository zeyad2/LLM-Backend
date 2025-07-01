import { Router } from "express";
import {
  createCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse
} from "../controllers/courses.controller.js";
import authorizeAdmin from "../middlewares/admin.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";
import multer from "multer";

const courseRouter = Router();
const upload = multer({ dest: "uploads/" });

//admin only routes
courseRouter.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("thumbnail"),
  createCourse
);

//public route
courseRouter.get("/", getCourses);

courseRouter.get("/:id", authenticate, getCourseById);

//put/update course

courseRouter.put("/:id", authenticate, authorizeAdmin, updateCourse);

//delete course

courseRouter.delete("/:id", authenticate, authorizeAdmin, deleteCourse);

export default courseRouter;
