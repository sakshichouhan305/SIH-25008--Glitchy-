import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    allowedDistricts: [{ type: String }],
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{ timestamps: true });

export default mongoose.model("Module", ModuleSchema);