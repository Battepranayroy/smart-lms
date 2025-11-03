import User from "../models/User.js";
import Course from "../models/Course.js";
import Review from "../models/Review.js";
import Progress from "../models/Progress.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email")
      .populate("students", "name email");
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("course", "title");
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all progress
export const getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find()
      .populate("user", "name email")
      .populate("lesson", "title")
      .populate("course", "title");
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
