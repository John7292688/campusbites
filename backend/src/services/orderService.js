const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const pool = orderModel.getPool();

const createOrder = async (studentId, totalAmount) => {
  return await orderModel.createOrder(studentId, totalAmount);
};

const getOrderById = async (orderId) => {
  return await orderModel.getOrderById(orderId);
};

const updateOrderStatus = async (orderId, status) => {
  return await orderModel.updateOrderStatus(orderId, status);
};

const createOrderItem = async (orderId, menuItemId, quantity, price) => {
  return await orderModel.createOrderItem(
    orderId,
    menuItemId,
    quantity,
    price
  );
};

const getOrderItems = async (orderId) => {
  return await orderModel.getOrderItems(orderId);
};

const checkout = async (studentId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const cartItems = await cartModel.getCartByStudentIdWithClient(
      client,
      studentId
    );

if (cartItems.length === 0) {
  throw new Error("Cart is empty");
}

const totalAmount = cartItems.reduce((total, item) => {
  return total + Number(item.price) * item.quantity;
}, 0);

const order = await orderModel.createOrderWithClient(
  client,
  studentId,
  totalAmount
);

for (const item of cartItems) {
  await orderModel.createOrderItemWithClient(
    client,
    order.id,
    item.menu_item_id,
    item.quantity,
    item.price
  );
}

await cartModel.clearCartWithClient(client, studentId);

    await client.query("COMMIT");
    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderStatus,
  createOrderItem,
  getOrderItems,
  checkout,
};