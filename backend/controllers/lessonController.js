import { getLesson } from "../services/lesson.services.js";

const fetchLesson = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const studentId = user && user.role === "student" ? user.id : null;

  try {
    const lesson = await getLesson(id, studentId);
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { fetchLesson };
