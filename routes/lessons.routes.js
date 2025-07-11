import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import authorizeAdmin from "../middlewares/admin.middleware.js";
import { createLesson, getLessons, addLessonToCourse, deleteAllLessons, removeLessonFromCourse } from "../controllers/lessons.controller.js";
import multer from "multer";

const lessonRouter = Router();

const upload = multer({ dest: "uploads/" });

//creates lesson in courseIds[].
lessonRouter.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.array("pdfs"),
  createLesson
);




lessonRouter.delete("/", authenticate, authorizeAdmin, deleteAllLessons);

// lessonRouter.patch()

//optional course id/ not provided retrieves all lessons
lessonRouter.get("/:course?/:id?", getLessons);
// mayber seperate them into two routes

//middleware? its not returned unless specified in course which checks for authentication. but if a user access url directly lesson will be returned with postman






//admin sees a list of lessons and chooses one to add to a course
lessonRouter.post("/course", authenticate, authorizeAdmin, addLessonToCourse);


lessonRouter.delete("/course", authenticate, authorizeAdmin, removeLessonFromCourse);
//





export default lessonRouter;
