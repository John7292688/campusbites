const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/", cartController.addToCart);

router.get("/:studentId", cartController.getCartByStudentId);

router.put("/:cartItemId", cartController.updateCartItemQuantity);

router.delete("/:cartItemId", cartController.removeCartItem);

module.exports = router;