import express from "express";
import {
  addQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

router.post("/add", addQuiz);
router.put("/update/:id", updateQuiz);
router.delete("/delete/:id", deleteQuiz);

export default router;
