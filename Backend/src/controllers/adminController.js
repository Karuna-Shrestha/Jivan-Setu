import db from "../config/db.js";

// Get all users
export const getAllUsers = (req, res) => {
  const sql = `
    SELECT id, name, email, role, created_at
    FROM users
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to fetch users",
      });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      count: result.length,
      users: result,
    });
  });
};

// Get single user
export const getUserById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to fetch user",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: result[0],
    });
  });
};

// Delete user
export const deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to delete user",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  });
};