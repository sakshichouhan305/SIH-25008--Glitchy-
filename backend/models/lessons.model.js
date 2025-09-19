import mongoose from "mongoose";
import Module from "./modules.model.js";
import {User} from "./user.model.js";

const LessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String }, // URL or text content
    lessonId: { type: String, required: true, unique: true },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    quiz:{type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", LessonSchema);
