const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getMyRestaurant,
  updateMyRestaurant,
  toggleRestaurantStatus,
  getTopRestaurants,
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

router.patch(
  "/toggle-status",
  restaurantOwnerAuthMiddleware,
  toggleRestaurantStatus
);

router.post(
  "/",
  restaurantOwnerAuthMiddleware,
  createRestaurant
);

router.get(
  "/featured",
  getTopRestaurants
);

// Keep this LAST
router.get("/:id", getRestaurantById);

module.exports = router;