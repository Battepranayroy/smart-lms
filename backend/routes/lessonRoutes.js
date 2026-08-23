import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  uploadLesson,
  getLessonsByCourse,
  getLesson,
} from "../controllers/lessonController.js";

const router = express.Router();

router.post("/upload", protect, upload.single("video"), uploadLesson);
router.get("/course/:courseId", protect, getLessonsByCourse);
router.get("/:lessonId", protect, getLesson);

export default router;
