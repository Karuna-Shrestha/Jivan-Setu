import express from "express";

import {
  createBloodRequest,
  getBloodRequests,
  getBloodRequestById,
  deleteBloodRequest,
} from "../controllers/bloodRequestController.js";

const router = express.Router();

// Create blood request
router.post("/", createBloodRequest);

// Get all blood requests
router.get("/", getBloodRequests);

// Get single blood request
router.get("/:id", getBloodRequestById);

// Delete blood request
router.delete("/:id", deleteBloodRequest);

export default router;