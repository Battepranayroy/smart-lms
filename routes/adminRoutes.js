import express from "express";
import {
  getAllUsers,
  getAllCourses,
  getAllReviews,
  getAllProgress
} from "../controllers/adminController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only admin can access
router.use(protect);
router.use(authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.get("/courses", getAllCourses);
router.get("/reviews", getAllReviews);
router.get("/progress", getAllProgress);

export default router;
