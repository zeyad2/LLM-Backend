import { Router } from "express";
import { createCourse, getCourses } from "../controllers/courses.controller.js";
import authorizeAdmin from "../middlewares/admin.middleware.js";

const courseRouter = Router();


//admin only routes
courseRouter.post("/", authorizeAdmin, createCourse);


courseRouter.get("/", getCourses )

// add archived boolean to courses to maybe retrieve them in the future



//put course


//delete course




export default courseRouter;