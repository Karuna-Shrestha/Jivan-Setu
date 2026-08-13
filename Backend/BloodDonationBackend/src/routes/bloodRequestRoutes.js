import express from "express";

import {
  createBloodRequest,
  getBloodRequests,
  getBloodRequestById,
  deleteBloodRequest,
} from "../controllers/bloodRequestController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Create blood request
router.post("/", verifyToken, createBloodRequest);

// Get all blood requests
router.get("/", getBloodRequests);

// Get single blood request
router.get("/:id", getBloodRequestById);

// Delete blood request
router.delete("/:id", verifyToken, deleteBloodRequest);

export default router;