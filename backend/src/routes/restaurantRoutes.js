const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getMyRestaurant,
} = require("../controllers/restaurantController");

const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");

router.get("/", getAllRestaurants);

router.get(
  "/my-restaurant",
  restaurantOwnerAuthMiddleware,
  getMyRestaurant
);

router.get("/:id", getRestaurantById);

router.post(
  "/",
  restaurantOwnerAuthMiddleware,
  createRestaurant
);

module.exports = router;