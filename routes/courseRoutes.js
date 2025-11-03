import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createCourse, getAllCourses, enrollCourse,getCourseStats, updateCourse, deleteCourse } from "../controllers/courseController.js";
import { authorizeRoles } from '../middleware/roleMiddleware.js';


const router = express.Router();

router.post("/", protect,authorizeRoles('instructor', 'admin'), createCourse);
router.get("/", getAllCourses);
router.get("/stats", getCourseStats);
router.post("/enroll/:courseId", protect, enrollCourse);
router.put('/:id', protect, authorizeRoles('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorizeRoles('admin'), deleteCourse);

export default router;
