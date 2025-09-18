import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String }, // URL or text content
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{ timestamps: true });

export default mongoose.model("Lesson", LessonSchema);