import jwt from "jsonwebtoken";
import "dotenv/config";

const loginUser = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }
  const {
    Role,
    Username,
    Name,
    Number,
    Email,
    Institute,
    State,
    District,
    City,
    Standard,
  } = req.body;

  // Validate role
  if (!["Student", "Institute-Admin", "Admin"].includes(Role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      Role,
      Username,
      Name,
      Number,
      Email,
      Institute,
      State,
      District,
      City,
      Standard,
    },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "1h" }
  );

  res.json({ message: "Successful", token });
};

export { loginUser };
