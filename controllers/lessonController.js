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
  const { lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId).populate("course");
  if (!lesson) return res.status(404).json({ message: "Lesson not found" });

  const enrolled = lesson.course.students.includes(req.user._id);
  if (!enrolled && String(req.user._id) !== String(lesson.course.instructor))
    return res.status(403).json({ message: "Access denied to this lesson" });

  res.json(lesson);
};
