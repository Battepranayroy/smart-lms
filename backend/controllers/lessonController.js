import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

// Upload a lesson
export const uploadLesson = async (req, res) => {
  const { title, description, duration, courseId } = req.body;
  const file = req.file;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (String(course.instructor) !== String(req.user._id))
    return res.status(403).json({ message: "Not authorized to upload lessons" });

  const lesson = await Lesson.create({
    course: courseId,
    title,
    description,
    videoUrl: `/uploads/${file.filename}`,
    duration,
    
  });
  course.lessons.push(lesson._id);
  await course.save();
  res.status(201).json({ message: "Lesson uploaded successfully", lesson });
};

// Get all lessons in a course
export const getLessonsByCourse = async (req, res) => {
  const { courseId } = req.params;
  const lessons = await Lesson.find({ course: courseId }).sort({ order: 1 });
  res.json(lessons);
};

// Get single lesson (with access control)
export const getLesson = async (req, res) => {
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  const course = await Course.findById(lesson.course);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  // ADMIN → always allowed
  if (req.user.role === "admin") {
    return res.json({ success: true, lesson });
  }

  // INSTRUCTOR → must own course
  if (
    req.user.role === "instructor" &&
    course.instructor.toString() === req.user._id.toString()
  ) {
    return res.json({ success: true, lesson });
  }

  // STUDENT → must be enrolled
  const enrolled = course.studentsEnrolled.some(
    id => id.toString() === req.user._id.toString()
  );

  if (!enrolled) {
    return res.status(403).json({
      message: "You are not enrolled in this course"
    });
  }

  res.json({ success: true, lesson });
};

