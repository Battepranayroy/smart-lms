import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { markLessonComplete, getProgress } from "../controllers/progressController.js";

const router = express.Router();

router.post("/complete", protect, markLessonComplete);
router.get("/:courseId", protect, getProgress);

export default router;
