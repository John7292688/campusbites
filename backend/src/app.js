const express = require("express");
const authRoutes = require("./routes/authRoutes");

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

module.exports = app;