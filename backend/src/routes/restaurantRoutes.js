const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
} = require("../controllers/restaurantController");

router.get("/", getAllRestaurants);
router.post("/", createRestaurant);

module.exports = router;