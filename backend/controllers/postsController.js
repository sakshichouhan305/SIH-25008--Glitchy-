import Post from "../models/posts.model.js";

// simple logger
const log = {
  info: (...args) => console.info(new Date().toISOString(), "[postsController]", ...args),
  debug: (...args) => console.debug(new Date().toISOString(), "[postsController]", ...args),
  error: (...args) => console.error(new Date().toISOString(), "[postsController]", ...args),
};

const createPost = async (req, res) => {
  const start = Date.now();
  log.info("createPost called", { user: req.user?.id, role: req.user?.role });
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      log.info("createPost validation failed");
      return res.status(400).json({ message: "Title and content are required" });
    }

    const createdBy = req.user?.id;
    const createdByModel = req.user?.role; // should be 'admin' or 'institute-admin'

    const post = await Post.create({ title, content, createdBy, createdByModel });
    log.info("Post created", { postId: post._id, createdBy, elapsed: `${Date.now() - start}ms` });
    return res.status(201).json({ message: "Post created", post });
  } catch (err) {
    log.error("createPost error:", err);
    return res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  const start = Date.now();
  log.info("getAllPosts called");
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");
    log.debug("getAllPosts fetched", { count: posts.length, elapsed: `${Date.now() - start}ms` });
    return res.json(posts);
  } catch (err) {
    log.error("getAllPosts error:", err);
    return res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  const start = Date.now();
  const id = req.params.id;
  log.info("getPostById called", { id });
  try {
    const post = await Post.findById(id).populate("createdBy", "name email");
    if (!post) {
      log.info("getPostById not found", { id });
      return res.status(404).json({ message: "Post not found" });
    }
    log.debug("getPostById success", { id, elapsed: `${Date.now() - start}ms` });
    return res.json(post);
  } catch (err) {
    log.error("getPostById error:", err);
    return res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  const start = Date.now();
  const id = req.params.id;
  log.info("updatePost called", { id, user: req.user?.id, role: req.user?.role });
  try {
    const post = await Post.findById(id);
    if (!post) {
      log.info("updatePost not found", { id });
      return res.status(404).json({ message: "Post not found" });
    }

    // permissions: admin can edit any, institute-admin can edit only their own posts
    if (req.user.role !== "admin" && post.createdBy.toString() !== req.user.id) {
      log.warn("updatePost forbidden", { id, user: req.user?.id, role: req.user?.role });
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, content } = req.body;
    post.title = title ?? post.title;
    post.content = content ?? post.content;

    await post.save();
    const updated = await Post.findById(id).populate("createdBy", "name email");
    log.info("Post updated", { id, elapsed: `${Date.now() - start}ms` });
    return res.json({ message: "Post updated", post: updated });
  } catch (err) {
    log.error("updatePost error:", err);
    return res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const start = Date.now();
  const id = req.params.id;
  log.info("deletePost called", { id, user: req.user?.id, role: req.user?.role });
  try {
    const post = await Post.findById(id);
    if (!post) {
      log.info("deletePost not found", { id });
      return res.status(404).json({ message: "Post not found" });
    }

    // permissions: admin can delete any, institute-admin can delete only their own posts
    if (req.user.role !== "admin" && post.createdBy.toString() !== req.user.id) {
      log.warn("deletePost forbidden", { id, user: req.user?.id, role: req.user?.role });
      return res.status(403).json({ message: "Forbidden" });
    }

    await Post.findByIdAndDelete(id);
    log.info("Post deleted", { id, elapsed: `${Date.now() - start}ms` });
    return res.json({ message: "Post deleted" });
  } catch (err) {
    log.error("deletePost error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
