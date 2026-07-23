const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const restaurantModel = require("../models/restaurantModel");
const pool = orderModel.getPool();

const createOrder = (studentId, totalAmount) => {
  return orderModel.createOrder(studentId, totalAmount);
};

const getOrderById = async (orderId) => {
  return await orderModel.getOrderById(orderId);
};

const getOrderByIdAndStudent = async (
  orderId,
  studentId
) => {
  return await orderModel.getOrderByIdAndStudent(
    orderId,
    studentId
  );
};

const getOrdersByStudentId = async (studentId) => {
  return await orderModel.getOrdersByStudentId(studentId);
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

const getOrdersByRestaurantId = async (restaurantId) => {
  return await orderModel.getOrdersByRestaurantId(restaurantId);
};

const getRestaurantOwnerByOrderId = async (orderId) => {
  return await orderModel.getRestaurantOwnerByOrderId(orderId);
};

const getOrdersForAuthenticatedOwner = async (ownerId) => {
  const restaurant = await restaurantModel.getRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return await orderModel.getOrdersByRestaurantId(restaurant.id);
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
  getOrderByIdAndStudent,
  getOrdersByStudentId,
  updateOrderStatus,
  createOrderItem,
  getOrderItems,
  getOrdersByRestaurantId,
  getRestaurantOwnerByOrderId,
  getOrdersForAuthenticatedOwner,
  checkout,
};