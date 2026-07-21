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

const updatePaymentStatus = async (
  transactionReference,
  status
) => {
  return await paymentModel.updatePaymentStatus(
    transactionReference,
    status
  );
};

const getPaymentByReference = async (transactionReference) => {
  return await paymentModel.getPaymentByReference(transactionReference);
};

module.exports = {
  createPayment,
  updatePaymentStatus,
  getPaymentByReference,
};