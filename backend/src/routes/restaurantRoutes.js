const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
} = require("../controllers/restaurantController");

const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");

router.get("/", getAllRestaurants);

router.post(
  "/",
  restaurantOwnerAuthMiddleware,
  createRestaurant
);

module.exports = router;