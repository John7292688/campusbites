const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");

router.get(
  "/summary",
  restaurantOwnerAuthMiddleware,
  dashboardController.getDashboardSummary
);

router.get(
  "/recent-orders",
  restaurantOwnerAuthMiddleware,
  dashboardController.getRecentOrders
);

module.exports = router;