

import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/images/blood-banks",

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname),
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|webp/;

  // Check extension
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error("Error: Please upload JPG, JPEG, PNG or WEBP images only!"),
    );
  }
}

export default upload;