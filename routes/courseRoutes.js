import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createCourse, getAllCourses, enrollCourse } from "../controllers/courseController.js";

const router = express.Router();

router.post("/", protect, createCourse);
router.get("/", getAllCourses);
router.post("/enroll/:courseId", protect, enrollCourse);

export default router;
