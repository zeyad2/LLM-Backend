import { Router } from "express";
import authorizeAdmin from "../middlewares/admin.middleware.js";
import {
  getEnrollmentRequests,
  createEnrollmentRequest,
  handleRequest,
  getEnrollments
} from "../controllers/enrollments.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const enrollmentsRouter = Router();


//gets all enrollment requests 
enrollmentsRouter.get("/requests", authenticate, authorizeAdmin, getEnrollmentRequests);



//takes user token and makes an enrollmentrequest with course id
enrollmentsRouter.post("/requests/:id", authenticate, createEnrollmentRequest);



//accept or reject request, inserts into enrollments
enrollmentsRouter.patch("/requests/:id", authenticate, authorizeAdmin, handleRequest);



// if id is provided get enrollments in course if not get all students and their enrollments
enrollmentsRouter.get("/enrolled/:id?", authenticate, authorizeAdmin, getEnrollments);

export default enrollmentsRouter;
