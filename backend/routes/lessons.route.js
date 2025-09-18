import express from "express";
import { fetchLesson } from "../controllers/lessonController.js";

const router = express.Router();

router.get("/fetch/:id", fetchLesson);

export default router;
