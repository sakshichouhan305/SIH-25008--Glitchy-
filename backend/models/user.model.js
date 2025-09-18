import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    default: "student"
  },
  isActive: { type: Boolean, default: true }, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
