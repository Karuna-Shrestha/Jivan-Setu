import db from "../config/db.js";

// Add Donor
export const addDonor = (req, res) => {
  const {
    name,
    age,
    gender,
    bloodGroup,
    phone,
    email,
    location,
    lastDonation,
  } = req.body;

  if (!name || !age || !gender || !bloodGroup || !phone || !location) {
    return res.status(400).json({
      message: "Name, age, gender, blood group, phone and location are required",
    });
  }

  const sql = `
    INSERT INTO donors
    (name, age, gender, blood_group, phone, email, location, last_donation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      age,
      gender,
      bloodGroup,
      phone,
      email || null,
      location,
      lastDonation || null,
    ],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Failed to add donor",
        });
      }

      res.status(201).json({
        message: "Donor registered successfully",
        id: result.insertId,
      });
    }
  );
};

// Get All Donors
export const getDonors = (req, res) => {
  const sql = "SELECT * FROM donors ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to fetch donors",
      });
    }

    res.status(200).json({
      message: "Donors fetched successfully",
      count: result.length,
      donors: result,
    });
  });
};

// Get Donor By ID
export const getDonorById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM donors WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to fetch donor",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Donor not found",
      });
    }

    res.status(200).json({
      message: "Donor fetched successfully",
      donor: result[0],
    });
  });
};

// Delete Donor
export const deleteDonor = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM donors WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to delete donor",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Donor not found",
      });
    }

    res.status(200).json({
      message: "Donor deleted successfully",
    });
  });
};