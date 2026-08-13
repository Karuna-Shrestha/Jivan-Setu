import db from "../config/db.js";

// Create Blood Request
export const createBloodRequest = (req, res) => {
  const {
    requester_name,
    phone,
    blood_group,
    units_needed,
    hospital_name,
    district,
    address,
    urgency,
    requisition_file,
  } = req.body;

  //logged in user's id from JWT
  const userId = req.user.id;


  // Required fields check
  if (!requester_name || !phone || !blood_group || !hospital_name || !district) {
    return res.status(400).json({
      message:
        "Requester name, phone, blood group, hospital name and district are required",
    });
  }

  const sql = `
    INSERT INTO blood_requests
    (
    user_id,
      requester_name,
      phone,
      blood_group,
      units_needed,
      hospital_name,
      district,
      address,
      urgency,
      requisition_file
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    userId,
    requester_name,
    phone,
    blood_group,
    units_needed || 1,
    hospital_name,
    district,
    address || null,
    urgency || "Normal",
    requisition_file || null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Create blood request error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    return res.status(201).json({
      message: "Blood request created successfully",
      request_id: result.insertId,
    });
  });
};


// Get All Blood Requests
export const getBloodRequests = (req, res) => {
  const sql = `
    SELECT
      br.id,
      br.user_id,
      br.requester_name,
      br.phone,
      br.blood_group,
      br.units_needed,
      br.hospital_name,
      br.district,
      br.address,
      br.urgency,
      br.requisition_file,
      br.status,
      br.created_at,
      u.full_name AS user_name,
      u.email AS user_email
    FROM blood_requests br
    JOIN users u
      ON br.user_id = u.id
    ORDER BY br.created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Get blood requests error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    return res.status(200).json({
      message: "Blood requests fetched successfully",
      count: result.length,
      requests: result,
    });
  });
};


// Get Single Blood Request
export const getBloodRequestById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT *
    FROM blood_requests
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Get blood request error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Blood request not found",
      });
    }

    return res.status(200).json({
      message: "Blood request fetched successfully",
      request: result[0],
    });
  });
};


// Update Blood Request Status
export const updateBloodRequestStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatus = [
    "Pending",
    "Approved",
    "Fulfilled",
    "Cancelled",
  ];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  const sql = `
    UPDATE blood_requests
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("Update blood request error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood request not found",
      });
    }

    return res.status(200).json({
      message: "Blood request status updated successfully",
    });
  });
};


// Delete Blood Request
export const deleteBloodRequest = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM blood_requests
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete blood request error:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Blood request not found",
      });
    }

    return res.status(200).json({
      message: "Blood request deleted successfully",
    });
  });
};