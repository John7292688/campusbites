const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.post("/items", orderController.createOrderItem);
router.post("/checkout", authMiddleware, orderController.checkout);
router.patch("/:orderId/status", orderController.updateOrderStatus);

router.get("/:orderId/items", orderController.getOrderItems);
router.get("/:orderId", orderController.getOrderById);

module.exports = router;