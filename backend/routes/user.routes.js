import express from "express";
import {
  updateUser,
  deleteUser,
  createStudent,
  createInstituteAdmin,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/createStudent", createStudent);
router.post("/createInstituteAdmin", createInstituteAdmin);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
