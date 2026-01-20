import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import Progress from "../models/Progress.js";

export const markLessonComplete = async (req, res) => {
  const { courseId, lessonId } = req.body;

  // Only students track progress
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can track progress" });
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  // Must be enrolled
  const enrolled = course.studentsEnrolled.some(
    id => id.toString() === req.user._id.toString()
  );
  if (!enrolled) {
    return res.status(403).json({ message: "Not enrolled in this course" });
  }

  const lesson = await Lesson.findById(lessonId);
  if (!lesson || lesson.course.toString() !== courseId) {
    return res.status(400).json({ message: "Invalid lesson for this course" });
  }

  let progress = await Progress.findOne({
    user: req.user._id,
    course: courseId,
  });

  if (!progress) {
    progress = await Progress.create({
      user: req.user._id,
      course: courseId,
      completedLessons: [],
    });
  }

  const alreadyCompleted = progress.completedLessons.some(
    id => id.toString() === lessonId
  );

  if (!alreadyCompleted) {
    progress.completedLessons.push(lessonId);
    await progress.save();
  }

  res.json({
    message: "Lesson marked complete",
    progress,
  });
};

export const getProgress = async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const enrolled = course.studentsEnrolled.some(
    id => id.toString() === req.user._id.toString()
  );

  if (!enrolled && req.user.role === "student") {
    return res.status(403).json({ message: "Not enrolled in this course" });
  }

  const progress = await Progress.findOne({
    user: req.user._id,
    course: courseId,
  }).populate("completedLessons", "title order");

  res.json({
    success: true,
    progress: progress || {
      completedLessons: [],
    },
  });
};

