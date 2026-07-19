const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post("/", authMiddleware, cartController.addToCart);

// You can protect these too
router.get("/", authMiddleware, cartController.getCartByStudentId);
router.put("/:cartItemId", authMiddleware, cartController.updateCartItemQuantity);
router.delete("/:cartItemId", authMiddleware, cartController.removeCartItem);

module.exports = router;