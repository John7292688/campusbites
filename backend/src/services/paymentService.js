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

const updatePaymentStatus = (
  transactionReference,
  status
) => {
  return paymentModel.updatePaymentStatus(
    transactionReference,
    status
  );
};

const getPaymentByReference = (transactionReference) => {
  return paymentModel.getPaymentByReference(transactionReference);
};

module.exports = {
  createPayment,
  updatePaymentStatus,
  getPaymentByReference,
};