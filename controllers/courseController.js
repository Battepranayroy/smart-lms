import Course from "../models/Course.js";

// Create Course
export const createCourse = async (req, res) => {
  const { title, description, price, category } = req.body;
  const course = await Course.create({
    title,
    description,
    price,
    category,
    instructor: req.user._id
  });
  res.status(201).json({ message: "Course created successfully", course });
};

// Get all courses
export const getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("instructor", "name email");
  res.json(courses);
};

// Enroll in course
export const enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (!course.students.includes(req.user._id)) {
    course.students.push(req.user._id);
    await course.save();
  }
  res.json({ message: "Enrolled successfully", course });
};
