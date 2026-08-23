import express from "express";
import { addReview, getCourseReviews, updateReview, deleteReview } from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/", protect, addReview);
router.get("/:courseId", getCourseReviews);
router.put("/:reviewId", protect, updateReview);
router.delete("/:reviewId", protect, deleteReview);

export default router;
