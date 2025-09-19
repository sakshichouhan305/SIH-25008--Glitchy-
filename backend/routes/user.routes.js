import express from "express";
import {
  updateUser,
  deleteUser,
  createStudent,
  createInstituteAdmin,
} from "../controllers/userController.js";
import roleMiddleware from "../middleware/role.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createStudent", createStudent);
router.post("/createInstituteAdmin",authMiddleware, roleMiddleware("admin"), createInstituteAdmin);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
