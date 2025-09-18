import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: {
    type: String,
    enum: ["admin", "institute-admin", "student"],
    default: "student"
  },
  institution: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
  city:{ type: String },
  district:{ type: String },
  standard: { type: String },
  isActive: { type: Boolean, default: true }, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
