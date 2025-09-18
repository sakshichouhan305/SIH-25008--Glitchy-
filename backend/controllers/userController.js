import { User, Student, InstituteAdmin, Admin } from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";
// Create Institute Admin

const createInstituteAdmin = async (req, res) => {
  try {
    const { name, email, instituteName, address, contactNumber } = req.body;
    const createdBy = req.user?._id; // assuming you attach user info in auth middleware

    // Validate required fields
    if (!name || !email || !instituteName) {
      return res.status(400).json({ error: "Missing required fields: name, email, password, instituteName" });
    }

    const instituteAdmin = new InstituteAdmin({
      name,
      email,
      instituteName,
      address,
      contactNumber,
      createdBy
    });

    const savedAdmin = await instituteAdmin.save();
    res.status(201).json({ message: "Institute Admin created", user: savedAdmin });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, email,  rollNumber, grade, institute } = req.body;
    const createdBy = req.user?._id; // e.g. institute-admin

    // Validate required fields
    if (!name || !email || !rollNumber || !grade || !institute) {
      return res.status(400).json({ error: "Missing required fields: name, email, password, rollNumber, grade, institute" });
    }

    const student = new Student({
      name,
      email,
      rollNumber,
      grade,
      institute,
      createdBy
    });

    const savedStudent = await student.save();
    res.status(201).json({ message: "Student created", user: savedStudent });

  } catch (err) {
    res.status(500).json({ error: err.message });
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

export { createStudent, createInstituteAdmin, updateUser, deleteUser };
