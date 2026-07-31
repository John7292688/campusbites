const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");

const orderController = require("../controllers/orderController");

// Student Routes
router.post("/", orderController.createOrder);
router.post("/items", orderController.createOrderItem);
router.post("/checkout", authMiddleware, orderController.checkout);

router.get(
  "/my-orders",
  authMiddleware,
  orderController.getMyOrders
);

// Restaurant Owner Routes
router.patch(
  "/:orderId/status",
  restaurantOwnerAuthMiddleware,
  orderController.updateOrderStatus
);

router.get(
  "/restaurant",
  restaurantOwnerAuthMiddleware,
  orderController.getOrdersByRestaurantId
);

// Shared Routes
router.get(
  "/:orderId/items",
  restaurantOwnerAuthMiddleware,
  orderController.getOrderItems
);
router.get("/:orderId", orderController.getOrderById);

module.exports = router;