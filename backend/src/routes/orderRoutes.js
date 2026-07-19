const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.post("/items", orderController.createOrderItem);
router.post("/checkout", orderController.checkout);

router.get("/:orderId/items", orderController.getOrderItems);
router.get("/:orderId", orderController.getOrderById);

module.exports = router;