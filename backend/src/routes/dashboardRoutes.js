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

router.get(
  "/top-selling-item",
  restaurantOwnerAuthMiddleware,
  dashboardController.getTopSellingMenuItem
);
module.exports = router;