const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.post("/initialize", paymentController.initializePayment);

router.post("/", paymentController.createPayment);

module.exports = router;