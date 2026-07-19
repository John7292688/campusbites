const paymentModel = require("../models/paymentModel");

const createPayment = async (
  orderId,
  amount,
  paymentMethod,
  transactionReference
) => {
  const existingPayment = await paymentModel.getPaymentByOrderId(orderId);

  if (existingPayment) {
    throw new Error("Payment already exists for this order");
  }

  return await paymentModel.createPayment(
    orderId,
    amount,
    paymentMethod,
    transactionReference
  );
};

module.exports = {
  createPayment,
};