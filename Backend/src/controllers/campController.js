import db from "../config/db.js";

export const addCamp = (req, res) => {
  const {
    camp_name,
    location,
    date,
    organizer,
    contact_number,
    description,
  } = req.body;

  if (!camp_name || !location || !date) {
    return res.status(400).json({
      message: "Camp name, location and date are required",
    });
  }

  const sql = `
    INSERT INTO camps
    (camp_name, location, date, organizer, contact_number, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [camp_name, location, date, organizer || null, contact_number || null, description || null],
    (err, result) => {
      if (err) {
        console.error("Add camp error:", err);
        return res.status(500).json({ message: "Database error", error: err.message });
      }

      return res.status(201).json({
        message: "Camp added successfully",
        camp_id: result.insertId,
      });
    }
  );
};

export const getCamps = (req, res) => {
  const sql = "SELECT * FROM camps ORDER BY date DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Get camps error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    return res.status(200).json({
      message: "Camps fetched successfully",
      count: result.length,
      camps: result,
    });
  });
};

export const getCampById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM camps WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Get camp error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Camp not found" });
    }

    return res.status(200).json({
      message: "Camp fetched successfully",
      camp: result[0],
    });
  });
};

export const deleteCamp = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM camps WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete camp error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Camp not found" });
    }

    return res.status(200).json({ message: "Camp deleted successfully" });
  });
};
