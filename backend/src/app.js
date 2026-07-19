const paymentRoutes = require("./routes/paymentRoutes");
const express = require("express");
const authRoutes = require("./routes/authRoutes");

const restaurantRoutes = require("./routes/restaurantRoutes");

const authMiddleware = require("./middleware/authMiddleware");

const menuRoutes = require("./routes/menuRoutes");

const cartRoutes = require("./routes/cartRoutes");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("CampusBites Backend Running");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CampusBites API is healthy"
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to your CampusBites profile!",
    student: req.student,
  });
});

module.exports = app;