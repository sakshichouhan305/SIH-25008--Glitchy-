import mongoose from "mongoose";

const options = { discriminatorKey: "role", collection: "users" };

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
}, options);

const User = mongoose.model("User", UserSchema);

// Admin discriminator
const Admin = User.discriminator("admin", new mongoose.Schema({
  district: String,
  permissions: [String]
}));

// Institute admin discriminator
const InstituteAdmin = User.discriminator("institute-admin", new mongoose.Schema({
  instituteName: String,
  address: String,
  contactNumber: String
}));

// Student discriminator
const Student = User.discriminator("student", new mongoose.Schema({
  rollNumber: String,
  grade: String,
  institute: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}));
export { User, Admin, InstituteAdmin, Student };