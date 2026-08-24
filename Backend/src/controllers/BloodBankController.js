import db from "../config/db.js";

// Add new blood bank
export const addBloodBank = (req, res) => {
  try {
    const {
      center_name,
      location,
      contact_number,
      email,
      website_url,
    } = req.body;

    // Validate required fields
    if (!center_name || !location || !contact_number) {
      return res.status(400).json({
        message: "Center name, location and contact number are required",
      });
    }

    // Multer uploaded photo
    const photo_url = req.file
      ? `/images/${req.file.filename}`
      : null;

    // Logged-in user's ID
    const submitted_by = req.user.id;

    const sql = `
      INSERT INTO blood_banks
      (
        center_name,
        location,
        contact_number,
        email,
        website_url,
        photo_url,
        status,
        submitted_by
      )
      VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?)
    `;

    const values = [
      center_name,
      location,
      contact_number,
      email || null,
      website_url || null,
      photo_url,
      submitted_by,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Add blood bank database error:", err);

        return res.status(500).json({
          message: "Failed to add blood bank",
          error: err.message,
        });
      }

      return res.status(201).json({
        message: "Blood bank submitted successfully for approval",
        bloodBankId: result.insertId,
      });
    });

  } catch (error) {
    console.error("Add blood bank error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};