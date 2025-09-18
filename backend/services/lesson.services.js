import Lesson from "../models/lessons.model.js";
import LessonRead from "../models/lessonReads.model.js";
import Module from "../models/modules.model.js";

const getLesson = async (lessonId, studentId) => {
  try {
    // Fetch the lesson
    const lesson = await Lesson.findById(lessonId)
      .populate("module")
      .populate("createdBy");
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Fetch or create lesson read
    let lessonRead = await LessonRead.findOne({
      lesson: lessonId,
      student: studentId,
    });
    if (!lessonRead) {
      lessonRead = new LessonRead({ lesson: lessonId, student: studentId });
      await lessonRead.save();
    }

    // Return the lesson
    return lesson;
  } catch (error) {
    throw new Error(`Error fetching lesson: ${error.message}`);
  }
};

export { getLesson };
