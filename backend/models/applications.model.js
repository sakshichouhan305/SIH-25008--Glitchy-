import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    instituteCode: { type: String, required: true },
    institute: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
},
{ timestamps: true });
export default mongoose.model("Application", ApplicationSchema);