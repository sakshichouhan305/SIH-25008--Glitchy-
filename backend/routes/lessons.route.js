import express from "express";
import { fetchLesson } from "../controllers/lessonController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/fetch/:id",authMiddleware, fetchLesson);

export default router;
