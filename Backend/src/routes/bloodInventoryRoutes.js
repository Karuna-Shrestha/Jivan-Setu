import express from "express";

import {
  addBloodInventory,
  getBloodInventory,
  getInventoryByBloodGroup,
  updateBloodInventory,
  deleteBloodInventory,
} from "../controllers/bloodInventoryController.js";

const router = express.Router();

router.post("/", addBloodInventory);

router.get("/", getBloodInventory);

router.get("/group/:blood_group", getInventoryByBloodGroup);

router.put("/:id", updateBloodInventory);

router.delete("/:id", deleteBloodInventory);

export default router;