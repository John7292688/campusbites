const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const restaurantOwnerAuthRoutes = require("./routes/restaurantOwnerAuthRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const menuCategoryRoutes = require("./routes/menuCategoryRoutes");
const customPlateRoutes = require("./routes/customPlateRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const contactRoutes = require("./routes/contactRoutes");
const packageRoutes = require("./routes/packageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const deliveryLocationRoutes = require(
  "./routes/deliveryLocationRoutes"
);
const notificationRoutes = require(
  "./routes/notificationRoutes"
);
const studentNotificationRoutes = require(
  "./routes/studentNotificationRoutes"
);
const packageCategoryRoutes = require(
  "./routes/packageCategoryRoutes"
);
const adminRoutes = require("./routes/adminRoutes");

const adminDashboardRoutes = require(
  "./routes/adminDashboardRoutes"
);

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
app.use("/api/admin", adminRoutes);
app.use(
  "/api/admin-dashboard",
  adminDashboardRoutes
);

// Feature Routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/menu-categories", menuCategoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/custom-plates", customPlateRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/combo-packages", packageRoutes);
app.use(
  "/api/package-categories",
  packageCategoryRoutes
);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(
  "/api/student-notifications",
  studentNotificationRoutes
);
app.use("/api/contact", contactRoutes);
app.use(
  "/api/delivery-locations",
  deliveryLocationRoutes
);

// Protected Student Profile Route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to your CampusBites profile!",
    student: req.student,
  });
});

// 404 Route (Keep this LAST)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler (Always after all routes)
app.use(errorHandler);

module.exports = app;