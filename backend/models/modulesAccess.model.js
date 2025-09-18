import mongoose from "mongoose";

const ModuleAccessSchema = new mongoose.Schema({
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    standard: { type: String, required: true },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: "institute-admin", required: true },
},
{ timestamps: true });

export default mongoose.model("ModuleAccess", ModuleAccessSchema);