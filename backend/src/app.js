const express = require("express");

const authRoutes = require("./routes/authRoutes");
const restaurantOwnerAuthRoutes = require("./routes/restaurantOwnerAuthRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const packageRoutes = require("./routes/packageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const authMiddleware = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/api/reviews", reviewRoutes);

// Protected Student Profile Route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to your CampusBites profile!",
    student: req.student,
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;