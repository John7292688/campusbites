const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.post("/initialize", paymentController.initializePayment);

router.get("/verify/:reference", paymentController.verifyPayment);

router.post("/", paymentController.createPayment);

module.exports = router;