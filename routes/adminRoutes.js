import express from "express";
import {
  getAllUsers,
  getAllCourses,
  getAllReviews,
  getAllProgress
} from "../controllers/adminController.js";

import { protect, admin as authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only admin can access
router.use(protect);
router.use(authorizeRoles);

router.get("/users", getAllUsers);
router.get("/courses", getAllCourses);
router.get("/reviews", getAllReviews);
router.get("/progress", getAllProgress);

export default router;
