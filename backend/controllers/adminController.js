import User from "../models/User.js";
import Course from "../models/Course.js";
import Review from "../models/Review.js";
import Progress from "../models/Progress.js";

// Get all users
export const getAllUsers = async (req, res,next) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

// Get all courses
export const getAllCourses = async (req, res,next) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email")
      .populate("studentsEnrolled", "name email");
    res.json({ success: true, courses });
  } catch (error) {
    next(error);
  }
};

// Get all reviews
export const getAllReviews = async (req, res,next) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("course", "title");
    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

// Get all progress
export const getAllProgress = async (req, res,next) => {
  try {
    const progress = await Progress.find()
      .populate("user", "name email")
      .populate("completedLessons", "title")
      .populate("course", "title");
    res.json({ success: true, progress });
  } catch (error) {
    next(error);
  }
};
