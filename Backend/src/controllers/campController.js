import db from "../config/db.js";

// Add Camp
export const addCamp = (req, res) => {
  const { title, date, location, description } = req.body;

  if (!title || !date || !location) {
    return res.status(400).json({
      message: "Title, date and location are required",
    });
  }

  const sql = `
    INSERT INTO camps (title, date, location, description)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, date, location, description || null],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Failed to add camp",
        });
      }

      res.status(201).json({
        message: "Camp added successfully",
        id: result.insertId,
      });
    }
  );
};

// Get All Camps
export const getCamps = (req, res) => {
  const sql = "SELECT * FROM camps ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to fetch camps",
      });
    }

    res.status(200).json({
      message: "Camps fetched successfully",
      count: result.length,
      camps: result,
    });
  });
};

// Get Single Camp
export const getCampById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM camps WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to fetch camp",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Camp not found",
      });
    }

    res.status(200).json({
      message: "Camp fetched successfully",
      camp: result[0],
    });
  });
};

// Delete Camp
export const deleteCamp = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM camps WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to delete camp",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Camp not found",
      });
    }

    res.status(200).json({
      message: "Camp deleted successfully",
    });
  });
};