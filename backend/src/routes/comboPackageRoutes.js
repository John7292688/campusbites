const express = require("express");
const router = express.Router();

const {
  getAllComboPackages,
  getRestaurantComboPackages,
} = require("../controllers/comboPackageController");

// Get all combo packages
router.get("/", getAllComboPackages);

// Get combo packages for one restaurant
router.get(
  "/restaurant/:restaurantId",
  getRestaurantComboPackages
);

module.exports = router;