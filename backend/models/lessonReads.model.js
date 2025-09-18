import mongoose from "mongoose";

const LessonReadSchema = new mongoose.Schema({
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    readAt: { type: Date, default: Date.now }
},
{ timestamps: true });
export default mongoose.model("LessonRead", LessonReadSchema);