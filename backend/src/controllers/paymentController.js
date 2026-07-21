const paymentService = require("../services/paymentService");
const orderService = require("../services/orderService");
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
    const { orderId, email, paymentMethod } = req.body;
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
    const order = await orderService.getOrderById(orderId);

if (!order) {
  return res.status(404).json({
    success: false,
    message: "Order not found",
  });
}

const amount = Number(order.total_amount);

    const response = await paystack.post("/transaction/initialize", {
      email,
      amount: amount * 100, // Convert Naira to Kobo
    });

    const paystackData = response.data.data;

await paymentService.createPayment(
  orderId,
  amount,
  paymentMethod,
  paystackData.reference
);

    return res.status(200).json({
  success: true,
  data: paystackData,
});
  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Payment initialization failed",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await paystack.get(
  `/transaction/verify/${reference}`
);

const payment = response.data.data;

if (payment.status === "success") {
  // Update the payment record
  await paymentService.updatePaymentStatus(
    reference,
    "Successful"
  );

  // Find the payment so we know which order it belongs to
  const paymentRecord = await paymentService.getPaymentByReference(reference);

  // Update the corresponding order
  await orderService.updateOrderStatus(
    paymentRecord.order_id,
    "Paid"
  );
}

return res.status(200).json({
  success: true,
  data: payment,
});
  } catch (error) {
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

module.exports = {
  createPayment,
  initializePayment,
  verifyPayment,
};