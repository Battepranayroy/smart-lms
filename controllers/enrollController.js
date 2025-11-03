import { Course } from '../models/courseModel.js';

export const enrollCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  if (course.studentsEnrolled.includes(req.user._id))
    return res.status(400).json({ message: 'Already enrolled' });

  course.studentsEnrolled.push(req.user._id);
  await course.save();

  res.status(200).json({ message: 'Enrollment successful', course });
};
