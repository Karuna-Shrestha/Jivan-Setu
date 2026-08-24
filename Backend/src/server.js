import express from "express";
import cors from "cors";
import db from "./config/db.js";

import authRoute from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoute.js";
import bloodBankRoutes from "./routes/BloodBankRoutes.js";
import bloodInventoryRoutes from "./routes/bloodInventoryRoutes.js";
import bloodRequestRoutes from "./routes/bloodRequestRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Auth
app.use("/api/auth", authRoute);

// Donors
app.use("/api/donors", donorRoutes);

// Blood banks
app.use("/api/blood-banks", bloodBankRoutes);

// Blood Inventory
app.use("/api/blood-inventory", bloodInventoryRoutes);

// Blood Requests
app.use("/api/blood-requests", bloodRequestRoutes);

// Admin
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});