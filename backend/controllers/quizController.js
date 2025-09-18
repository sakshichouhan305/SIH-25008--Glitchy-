import Quiz from "../models/quiz.model.js";

const addQuiz = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }
  const { title, description, module, institute, createdBy, questions } =
    req.body;

  if (!title || !institute || !createdBy) {
    return res
      .status(400)
      .json({ message: "Title, institute, and createdBy are required" });
  }

  try {
    const quiz = new Quiz({
      title,
      description,
      module,
      institute,
      createdBy,
      questions,
    });
    await quiz.save();
    res.status(201).json({ message: "Quiz added successfully", quiz });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateQuiz = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No updates provided" });
  }

  try {
    const quiz = await Quiz.findByIdAndUpdate(id, updates, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided" });
  }
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { addQuiz, updateQuiz, deleteQuiz };
