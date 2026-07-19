const pool = require("../config/database");

const createPayment = async (
  orderId,
  amount,
  paymentMethod,
  transactionReference
) => {
  const result = await pool.query(
    `
    INSERT INTO payments (
      order_id,
      amount,
      payment_method,
      transaction_reference
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [
      orderId,
      amount,
      paymentMethod,
      transactionReference,
    ]
  );

  return result.rows[0];
};

const getPaymentByOrderId = async (orderId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM payments
    WHERE order_id = $1;
    `,
    [orderId]
  );

  return result.rows[0];
};

module.exports = {
  createPayment,
  getPaymentByOrderId,
};