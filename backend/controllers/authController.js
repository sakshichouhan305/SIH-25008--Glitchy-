import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }
  const {
    role,
    username,
    name,
    number,
    email,
    institute,
    state,
    district,
    city,
    standard,
    password,
  } = req.body;

  // Validate role
  if (!["Student", "Institute-Admin", "Admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  // Map role to model role
  const modelRole =
    role === "Student"
      ? "student"
      : role === "Institute-Admin"
      ? "institute-admin"
      : "admin";

  try {
    // Find user by email and role
    const user = await User.findOne({ email: email, role: modelRole });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    // if (!password || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.name, // Using name as username
        name: user.name,
        email: user.email,
        // Add other fields if available in user
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Successful", token , role});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userRole = role || "student"; // Default to student if not provided

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.password) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name: name || "",
      role: userRole,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
        username: newUser.name,
        name: newUser.name,
        email: newUser.email,
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ message: "User created and logged in successfully", token, role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { loginUser, signupUser };
