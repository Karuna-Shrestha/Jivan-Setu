import db from "../config/db.js";

// Add blood inventory
export const addBloodInventory = (req, res) => {
  const {
    blood_group,
    component,
    units_available,
    blood_bank_name,
    district,
  } = req.body;

  if (!blood_group || !blood_bank_name || !district) {
    return res.status(400).json({
      message: "Blood group, blood bank name and district are required",
    });
  }

  const sql = `
    INSERT INTO blood_inventory
    (
      blood_group,
      component,
      units_available,
      blood_bank_name,
      district
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    blood_group,
    component || "Whole Blood",
    units_available || 0,
    blood_bank_name,
    district,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Add blood inventory error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    return res.status(201).json({
      message: "Blood inventory added successfully",
      inventory_id: result.insertId,
    });
  });
};


// Get all blood inventory
export const getBloodInventory = (req, res) => {
  const sql = `
    SELECT *
    FROM blood_inventory
    ORDER BY blood_group ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Get blood inventory error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    return res.status(200).json({
      message: "Blood inventory fetched successfully",
      count: result.length,
      inventory: result,
    });
  });
};


// Get inventory by blood group
export const getInventoryByBloodGroup = (req, res) => {
  const { blood_group } = req.params;

  const sql = `
    SELECT *
    FROM blood_inventory
    WHERE blood_group = ?
  `;

  db.query(sql, [blood_group], (err, result) => {
    if (err) {
      console.error("Get inventory by blood group error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    return res.status(200).json({
      message: "Blood inventory fetched successfully",
      count: result.length,
      inventory: result,
    });
  });
};


// Update blood inventory
export const updateBloodInventory = (req, res) => {
  const { id } = req.params;
  const {
    blood_group,
    component,
    units_available,
    blood_bank_name,
    district,
  } = req.body;

  const sql = `
    UPDATE blood_inventory
    SET
      blood_group = ?,
      component = ?,
      units_available = ?,
      blood_bank_name = ?,
      district = ?
    WHERE id = ?
  `;

  const values = [
    blood_group,
    component,
    units_available,
    blood_bank_name,
    district,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update blood inventory error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood inventory not found",
      });
    }

    return res.status(200).json({
      message: "Blood inventory updated successfully",
    });
  });
};


// Delete blood inventory
export const deleteBloodInventory = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM blood_inventory
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete blood inventory error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood inventory not found",
      });
    }

    return res.status(200).json({
      message: "Blood inventory deleted successfully",
    });
  });
};