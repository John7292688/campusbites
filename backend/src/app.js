const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const restaurantOwnerAuthRoutes = require("./routes/restaurantOwnerAuthRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const packageRoutes = require("./routes/packageRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const authMiddleware = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Home Route
app.get("/", (req, res) => {
  res.send("CampusBites Backend Running");
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CampusBites API is healthy",
  });
});

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurant-auth", restaurantOwnerAuthRoutes);

// Feature Routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);

// Protected Student Profile Route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to your CampusBites profile!",
    student: req.student,
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;