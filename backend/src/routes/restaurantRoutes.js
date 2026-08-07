const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getMyRestaurant,
  updateMyRestaurant,
} = require("../controllers/restaurantController");

const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");

// Public Routes
router.get("/", getAllRestaurants);

// Restaurant Owner Routes (must come BEFORE /:id)
router.get(
  "/my-restaurant",
  restaurantOwnerAuthMiddleware,
  getMyRestaurant
);

router.put(
  "/my-restaurant",
  restaurantOwnerAuthMiddleware,
  updateMyRestaurant
);

router.post(
  "/",
  restaurantOwnerAuthMiddleware,
  createRestaurant
);

// Keep this LAST
router.get("/:id", getRestaurantById);

module.exports = router;