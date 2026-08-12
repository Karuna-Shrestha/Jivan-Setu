import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// ================= REGISTER =================

export const registerUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      phone,
      age,
      gender,
      blood_group,
      district,
      address,
      last_donation_date,
    } = req.body;

    // Required fields
    if (!full_name || !email || !password) {
      return res.status(400).json({
        message: "Full name, email and password are required",
      });
    }

    // Check existing email
    const checkEmail = "SELECT * FROM users WHERE email = ?";

    db.query(checkEmail, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err.message,
        });
      }

      if (result.length > 0) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const sql = `
        INSERT INTO users
        (
          full_name,
          email,
          password,
          phone,
          age,
          gender,
          blood_group,
          district,
          address,
          last_donation_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        full_name,
        email,
        hashedPassword,
        phone,
        age,
        gender,
        blood_group,
        district,
        address,
        last_donation_date,
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Failed to register user",
            error: err.message,
          });
        }

        return res.status(201).json({
          message: "User registered successfully",
          userId: result.insertId,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ================= LOGIN =================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err.message,
        });
      }

      // User not found
      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      // Compare password
      const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Create JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        "blooddonation_secret",
        {
          expiresIn: "1d",
        }
      );

      // Successful response
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ================= GET PROFILE =================

export const getProfile = async (req, res) => {
  try {
    // JWT bata user ID
    const userId = req.user.id;

    const sql = `
      SELECT
        id,
        full_name,
        email,
        phone,
        age,
        gender,
        blood_group,
        district,
        address,
        last_donation_date,
        is_available,
        role,
        created_at
      FROM users
      WHERE id = ?
    `;

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Get profile database error:", err);

        return res.status(500).json({
          message: "Database error",
          error: err.message,
        });
      }

      // User not found
      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Profile response
      return res.status(200).json({
        message: "Profile fetched successfully",
        user: result[0],
      });
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};