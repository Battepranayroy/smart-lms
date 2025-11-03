import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String },
  duration: { type: Number }, // in minutes
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Lesson", lessonSchema);
