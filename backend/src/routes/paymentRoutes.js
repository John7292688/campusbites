const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/initialize",
  authMiddleware,
  paymentController.initializePayment
);

router.get(
  "/verify/:reference",
  authMiddleware,
  paymentController.verifyPayment
);

router.post(
  "/",
  authMiddleware,
  paymentController.createPayment
);

module.exports = router;