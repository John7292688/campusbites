const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
} = require("../controllers/restaurantController");

const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);

router.post(
  "/",
  restaurantOwnerAuthMiddleware,
  createRestaurant
);

module.exports = router;