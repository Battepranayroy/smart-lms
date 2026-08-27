import Course from "../models/Course.js";
import * as Sentry from "@sentry/node";
// Create Course
export const createCourse = async (req, res,next) => {
  try {
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
}catch (error) {
  next(error);
}
};

// Get all courses
export const getAllCourses = async (req, res,next) => {
  try {
    const { title, category, minPrice, maxPrice, sort } = req.query;

    let filter = {};

    //  Search by title
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    //  Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    //  Sorting
    let sortOption = {};
    if (sort === "priceAsc") sortOption.price = 1;
    else if (sort === "priceDesc") sortOption.price = -1;
    else if (sort === "rating") sortOption.averageRating = -1;
    else sortOption.createdAt = -1; // popularity / default

    const courses = await Sentry.startSpan(
  {
    name: "Fetch all courses",
    op: "course.fetch",
  },
  async () => {
     await new Promise(resolve => setTimeout(resolve, 2000));
    return await Course.find(filter)
      .sort(sortOption)
      .populate("instructor", "name email");
  }
);

    res.json(courses);
  } catch (error) {
    next(error);
  }
};


// Enroll in course
export const enrollCourse = async (req, res,next) => {
  try {
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
}catch (error) {
  next(error);  
}
};


// Get total enrollments per course category
export const getCourseStats = async (req, res,next) => {
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
    next(error);
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
    next(error);
  }
};

//  Delete Course
export const deleteCourse = async (req, res,next) => {
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
    next(error);
  }
};

//better search results purpose

export const searchCourses = async (req, res,next) => {
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
    next(error);
  }
};

/*get catergory count to update the ui with courses count based on the category*/

export const getCategoryStats = async (req, res,next) => {
  try{
  const stats = await Course.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(stats);
}
  catch (error) {
    next(error);
  }


};

/*featured courses*/
export const getFeaturedCourses = async (req, res,next) => {
  try {
    const courses = await Course.find()
      .sort({ averageRating: -1 })   // highest rating first
      .limit(4)
      .populate("instructor", "name");

  res.json(courses);
  }
  catch (error) {
    next(error);
  }
};

//get course by Id
export const getCourseById = async (req, res,next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id)
      .populate("instructor", "name")
      .populate({
        path: "lessons",
        select: "title videoUrl description"
      });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
