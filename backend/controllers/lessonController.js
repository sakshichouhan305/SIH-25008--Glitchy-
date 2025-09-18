import { getLesson } from "../services/lesson.services.js";

const fetchLesson = async (req, res) => {
  const { id } = req.params;
  const { studentId } = req.body; // Assuming studentId is passed in the request body

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const lesson = await getLesson(id, studentId);
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { fetchLesson };
