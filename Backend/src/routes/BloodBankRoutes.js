import express from "express";
import multer from "multer";
import path from "path";

import { addBloodBank } from "../controllers/BloodBankController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./public/images",

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post(
  "/",
  verifyToken,
  upload.single("photo"),
  addBloodBank
);

export default router;