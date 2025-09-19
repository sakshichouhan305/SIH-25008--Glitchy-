import mongoose from "mongoose";

const AttemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      selectedOption: { type: Number, required: true }, 
      isCorrect: { type: Boolean, required: true },
      pointsEarned: { type: Number, default: 0 }
    }
  ],
  score: { type: Number, default: 0 },
  totalPoints: { type: Number, required: true },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  duration: { type: Number }, 
});

export default mongoose.model("Attempt", AttemptSchema);
