import express from "express";
import { createApplication, getAllApplications, getApplicationById, updateApplication, deleteApplication } from "../controllers/applicationController.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/applications
 * @desc    Create new application
 * @access  Public
 */
router.post("/",createApplication);

/**
 * @route   GET /api/applications
 * @desc    Get all applications
 * @access  Admin
 */
router.get("/", getAllApplications);

/**
 * @route   GET /api/applications/:id
 * @desc    Get application by ID
 * @access  Admin
 */
router.get("/:id",getApplicationById);

/**
 * @route   PUT /api/applications/:id
 * @desc    Update application (status, reviewedBy)
 * @access  Admin
 */
router.put("/:id",authMiddleware, roleMiddleware("admin"), updateApplication);

/**
 * @route   DELETE /api/applications/:id
 * @desc    Delete application
 * @access  Admin
 */
router.delete("/:id",authMiddleware,roleMiddleware("admin"), deleteApplication);

export default router;
