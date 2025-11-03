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

// Get total enrollments per course category
export const getCourseStats = async (req, res) => {
  try {
    const stats = await Course.aggregate([
      {
        $group: {
          _id: "$category",
          totalCourses: { $sum: 1 },
          averagePrice: { $avg: "$price" },
        },
      },
      { $sort: { totalCourses: -1 } },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};