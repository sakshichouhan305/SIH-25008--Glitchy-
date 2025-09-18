import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "createdByModel"   
    },
    createdByModel: {
        type: String,
        required: true,
        enum: ["admin", "institute-admin"]  
    }
},
{ timestamps: true });
export default mongoose.model("Post", PostsSchema);