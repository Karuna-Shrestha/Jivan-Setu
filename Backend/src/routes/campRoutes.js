import express from "express";

import {
  addCamp,
  getCamps,
  getCampById,
  deleteCamp,
} from "../controllers/campController.js";

const router = express.Router();

router.post("/", addCamp);
router.get("/", getCamps);
router.get("/:id", getCampById);
router.delete("/:id", deleteCamp);

export default router;
