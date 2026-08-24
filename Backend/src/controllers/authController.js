import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

// ================= REGISTER =================

export const registerUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      phone,
      blood_group,
      address,
      role,
    } = req.body;

    // Required fields
    if (
      !full_name ||
      !email ||
      !password ||
      !phone ||
      !blood_group ||
      !address
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
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
          blood_group,
          address,
          role
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        full_name,
        email,
        hashedPassword,
        phone,
        blood_group,
        address,
        role || "user",
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

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET || "blooddonation_secret",
        {
          expiresIn: "1d",
        }
      );

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
    const userId = req.user.id;

    const sql = `
      SELECT
        id,
        full_name,
        email,
        phone,
        blood_group,
        address,
        role
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

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

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