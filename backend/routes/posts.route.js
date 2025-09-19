import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/postsController.js";

const router = express.Router();

// Public: list and read posts
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected: create by admin or institute-admin
router.post("/", authMiddleware, roleMiddleware(["admin", "institute-admin"]), createPost);

// Protected: update/delete (authorization enforced inside controller)
router.put("/:id", authMiddleware, roleMiddleware(["admin", "institute-admin"]), updatePost);
router.delete("/:id", authMiddleware, roleMiddleware(["admin", "institute-admin"]), deletePost);

export default router;
