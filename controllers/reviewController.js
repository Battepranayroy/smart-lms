import Review from "../models/Review.js";
import Course from "../models/Course.js";

// Add a review
export const addReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const userId = req.user._id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create review
    const review = await Review.create({
      course: courseId,
      user: userId,
      rating,
      comment
    });

    // Recalculate average rating and total reviews
    const reviews = await Review.find({ course: courseId });
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    course.averageRating = averageRating;
    course.totalReviews = totalReviews;
    await course.save();

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews for a course
export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await Review.find({ course: courseId })
      .populate("user", "name") // show reviewer name
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update a review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Only the review owner or admin can update
    if (review.user.toString() !== userId.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    // Recalculate average rating
    const reviews = await Review.find({ course: review.course });
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    const course = await Course.findById(review.course);
    course.averageRating = averageRating;
    course.totalReviews = totalReviews;
    await course.save();

    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Only owner or admin can delete
    if (review.user.toString() !== userId.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.remove();

    // Recalculate average rating
    const reviews = await Review.find({ course: review.course });
    const totalReviews = reviews.length;
    const averageRating = totalReviews
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    const course = await Course.findById(review.course);
    course.averageRating = averageRating;
    course.totalReviews = totalReviews;
    await course.save();

    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
