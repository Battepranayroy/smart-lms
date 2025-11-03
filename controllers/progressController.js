import Progress from "../models/Progress.js";

export const markLessonComplete = async (req, res) => {
  const { courseId, lessonId } = req.body;
  let progress = await Progress.findOne({ user: req.user._id, course: courseId });

  if (!progress) progress = await Progress.create({ user: req.user._id, course: courseId });

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    await progress.save();
  }

  res.json({ message: "Lesson marked complete", progress });
};

export const getProgress = async (req, res) => {
  const { courseId } = req.params;
  const progress = await Progress.findOne({ user: req.user._id, course: courseId })
    .populate("completedLessons", "title");
  res.json(progress);
};
