import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 0 },
  category: { type: String },
  tags: [{ type: String }],               // array of tags/keywords
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  // Adding extra features
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
