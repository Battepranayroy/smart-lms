import Course from "../models/Course.js";

// Create Course
export const createCourse = async (req, res) => {
  const { title, description, price, category,tags } = req.body;
  const course = await Course.create({
    title,
    description,
    price,
    category,
    tags,
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
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const alreadyEnrolled = course.studentsEnrolled.some(
    studentId => studentId.toString() === req.user._id.toString()
  );

  if (alreadyEnrolled) {
    return res.status(400).json({ message: "Already enrolled" });
  }

  course.studentsEnrolled.push(req.user._id);
  await course.save();

  res.json({
    message: "Enrolled successfully",
    course
  });
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



// Update Course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find course
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Allow only instructor who created or admin to update
    if (
      course.instructor.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    // Update the course fields dynamically
    Object.keys(updates).forEach((key) => {
      course[key] = updates[key];
    });

    const updatedCourse = await course.save();
    res.status(200).json({
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//  Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Only admin can delete
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.deleteOne();

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//better search results purpose

export const searchCourses = async (req, res) => {
  try {
    const { title, category, tag } = req.query;

    let filter = {};

    if (title) filter.title = { $regex: title, $options: "i" }; // case-insensitive search
    if (category) filter.category = category;
    if (tag) filter.tags = tag;

    const courses = await Course.find(filter)
      .populate("instructor", "name role")
      .populate("studentsEnrolled", "name");

    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

