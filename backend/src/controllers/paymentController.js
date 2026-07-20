const paymentService = require("../services/paymentService");
const paystack = require("../config/paystack");

const createPayment = async (req, res) => {
  try {
    const {
      orderId,
      amount,
      paymentMethod,
      transactionReference,
    } = req.body;

    const allowedPaymentMethods = [
      "Paystack",
      "Flutterwave",
      "Cash",
    ];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    const payment = await paymentService.createPayment(
      orderId,
      amount,
      paymentMethod,
      transactionReference
    );

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create payment",
    });
  }
};

const initializePayment = async (req, res) => {
  try {
    const { email, amount } = req.body;

    const response = await paystack.post("/transaction/initialize", {
      email,
      amount: amount * 100, // Convert Naira to Kobo
    });

    return res.status(200).json({
      success: true,
      data: response.data.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Payment initialization failed",
    });
  }
};

module.exports = {
  createPayment,
  initializePayment,
};