import express from "express";

import {
  addDonor,
  getDonors,
  getDonorById,
  deleteDonor,
} from "../controllers/donorController.js";

const router = express.Router();

router.post("/", addDonor);
router.get("/", getDonors);
router.get("/:id", getDonorById);
router.delete("/:id", deleteDonor);

export default router;