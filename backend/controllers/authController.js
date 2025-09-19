import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

// add logger
const log = {
  info: (...args) => console.info(new Date().toISOString(), "[authController]", ...args),
  debug: (...args) => console.debug(new Date().toISOString(), "[authController]", ...args),
  error: (...args) => console.error(new Date().toISOString(), "[authController]", ...args)
};

const loginUser = async (req, res) => {
  log.info("loginUser called", { ip: req.ip, path: req.originalUrl });
  if (!req.body || Object.keys(req.body).length === 0) {
    log.info("loginUser - no data provided");
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

  log.debug("loginUser payload summary", { email, role });

  // Validate role
  if (!["Student", "Institute-Admin", "Admin"].includes(role)) {
    log.warn("loginUser - invalid role", { role });
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
      log.info("loginUser - user not found", { email, modelRole });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Password check is commented out in existing code; if enabled do not log password
    // Compare password
    // if (!password || !(await bcrypt.compare(password, user.password))) {
    //   log.info("loginUser - invalid password attempt", { userId: user._id });
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

    log.info("loginUser success", { userId: user._id, role: user.role });
    res.json({ message: "Successful", token , role});
  } catch (error) {
    log.error("loginUser error:", error);
    res.status(500).json({ message: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  log.info("signupUser called", { ip: req.ip, email, role });

  if (!email || !password) {
    log.info("signupUser validation failed - missing email/password");
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userRole = role || "student"; // Default to student if not provided

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.password) {
      log.info("signupUser - user already exists", { email });
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

    log.info("signupUser success", { userId: newUser._id, role: newUser.role });
    res
      .status(201)
      .json({ message: "User created and logged in successfully", token, role });
  } catch (error) {
    log.error("signupUser error:", error);
    res.status(500).json({ message: error.message });
  }
};

export { loginUser, signupUser };
