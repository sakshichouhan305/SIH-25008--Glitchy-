import User from "../models/user.model.js";

const createUser = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }
  const { name, email, role } = req.body;

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

  try {
    const user = new User({ name, email, role });
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
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }

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
