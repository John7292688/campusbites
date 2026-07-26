const express = require("express");
const router = express.Router();

const {
  createCustomPlate,
} = require("../controllers/customPlateController");

const authMiddleware = require("../middleware/authMiddleware");

// Create a custom plate
router.post(
  "/",
  authMiddleware,
  createCustomPlate
);

module.exports = router;