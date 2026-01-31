import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createCourse, getCourseById, getAllCourses, getFeaturedCourses, getCategoryStats, enrollCourse,getCourseStats, updateCourse, deleteCourse, searchCourses } from "../controllers/courseController.js";
import { authorizeRoles } from '../middlewares/roleMiddleware.js';


const router = express.Router();

router.post("/", protect,authorizeRoles('instructor', 'admin'), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/featured", getFeaturedCourses);
router.get("/categories/stats", getCategoryStats);
router.get("/search", searchCourses);
router.get("/stats", getCourseStats);
router.post("/enroll/:courseId", protect, enrollCourse);
router.put('/:id', protect, authorizeRoles('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorizeRoles('admin'), deleteCourse);

export default router;
