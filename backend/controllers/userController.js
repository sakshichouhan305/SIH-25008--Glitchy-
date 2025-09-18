import { User, Student, InstituteAdmin, Admin } from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }
  const { name, email, role, ...roleSpecificFields } = req.body;

  // Validate required fields
  if (!name || !email || !role) {
    return res
      .status(400)
      .json({ message: "Name, email, and role are required" });
  }

  // Validate role
  if (!["student", "institute-admin", "admin"].includes(role)) {
    return res.status(400).json({
      message: "Invalid role. Must be student, institute-admin, or admin",
    });
  }

  // Check authorization from JWT token
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const creatorRole = decoded.Role;

  // Permission checks
  if (creatorRole === "institute-admin" && role !== "student") {
    return res
      .status(403)
      .json({ message: "Institute-admin can only create students" });
  }

  if (creatorRole === "admin" && role !== "institute-admin") {
    return res
      .status(403)
      .json({ message: "Admin can only create institute-admins" });
  }

  // Only admin can create other admins or institute-admins? Wait, the user said admin can only create institute-admin, but probably admin can create all, but according to user: "if he is admin he can only create institute-admin"
  // But for institute-admin, only student.
  // Assuming admin can create institute-admin, and perhaps others, but per user, only institute-admin.

  try {
    let UserModel = User;
    let userData = { name, email, role };

    // Validate role-specific fields
    if (role === "student") {
      UserModel = Student;
      const { rollNumber, grade, institute } = roleSpecificFields;
      if (rollNumber && typeof rollNumber !== "string") {
        return res
          .status(400)
          .json({ message: "Roll number must be a string" });
      }
      if (grade && typeof grade !== "string") {
        return res.status(400).json({ message: "Grade must be a string" });
      }
      if (institute && !mongoose.Types.ObjectId.isValid(institute)) {
        return res
          .status(400)
          .json({ message: "Institute must be a valid ObjectId" });
      }
      userData = { ...userData, ...roleSpecificFields };
    } else if (role === "institute-admin") {
      UserModel = InstituteAdmin;
      const { instituteName, address, contactNumber } = roleSpecificFields;
      if (instituteName && typeof instituteName !== "string") {
        return res
          .status(400)
          .json({ message: "Institute name must be a string" });
      }
      if (address && typeof address !== "string") {
        return res.status(400).json({ message: "Address must be a string" });
      }
      if (contactNumber && typeof contactNumber !== "string") {
        return res
          .status(400)
          .json({ message: "Contact number must be a string" });
      }
      userData = { ...userData, ...roleSpecificFields };
    } else if (role === "admin") {
      UserModel = Admin;
      const { district, permissions } = roleSpecificFields;
      if (district && typeof district !== "string") {
        return res.status(400).json({ message: "District must be a string" });
      }
      if (permissions && !Array.isArray(permissions)) {
        return res
          .status(400)
          .json({ message: "Permissions must be an array of strings" });
      }
      if (permissions && permissions.some((p) => typeof p !== "string")) {
        return res
          .status(400)
          .json({ message: "Each permission must be a string" });
      }
      userData = { ...userData, ...roleSpecificFields };
    }

    const user = new UserModel(userData);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const updateUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No updates provided" });
  }

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createUser, updateUser, deleteUser };
