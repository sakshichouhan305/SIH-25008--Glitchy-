import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true }, // index of correct option
  points: { type: Number, default: 1 },
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "institute-admin",
    required: true,
  },
  questions: [QuestionSchema],
  attempts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attempt" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quiz", QuizSchema);
