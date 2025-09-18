import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{ timestamps: true });
export default mongoose.model("Post", PostsSchema);