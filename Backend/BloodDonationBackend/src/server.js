import express from "express";
import cors from "cors";
import db from "./config/db.js";

import authRoute from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoute.js";
import bloodInventoryRoutes from "./routes/bloodInventoryRoutes.js";
import campRoutes from "./routes/campRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Auth
app.use("/api/auth", authRoute);

// Donors
app.use("/api/donors", donorRoutes);

// Blood Inventory
app.use("/api/blood-inventory", bloodInventoryRoutes);

// Camps
app.use("/api/camps", campRoutes);

// Admin
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});