const orderService = require("../services/orderService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { getIO } = require("../socket");

const createOrder = asyncHandler(async (req, res) => {
  const { studentId, totalAmount } = req.body;

  const order = await orderService.createOrder(studentId, totalAmount);

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await orderService.getOrderById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const studentId = req.student.id;

  const orders = await orderService.getOrdersByStudentId(studentId);

  res.status(200).json({
    success: true,
    orders,
  });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "Preparing",
    "Ready",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new AppError("Invalid order status", 400);
  }

  // Get the authenticated restaurant owner
  const ownerId = req.owner.id;

  // Find who owns the restaurant for this order
  const orderOwner = await orderService.getRestaurantOwnerByOrderId(orderId);

  if (!orderOwner) {
    throw new AppError("Order not found", 404);
  }

  // Check ownership
  if (orderOwner.owner_id !== ownerId) {
    throw new AppError(
      "You are not authorized to update this order",
      403
    );
  }

  // Update the order status
  // Update the order status
const order = await orderService.updateOrderStatus(
  orderId,
  status
);

// Get full order details
const updatedOrder =
  await orderService.getOrderById(orderId);

const io = getIO();

if (io) {
  io.to(
    `student_${updatedOrder.student_id}`
  ).emit("order_status_updated", {
    orderId: updatedOrder.id,
    status: updatedOrder.status,
  });
}

res.status(200).json({
  success: true,
  message: "Order status updated successfully",
  order,
});
});

const createOrderItem = asyncHandler(async (req, res) => {
  const { orderId, menuItemId, quantity, price } = req.body;

  const orderItem = await orderService.createOrderItem(
    orderId,
    menuItemId,
    quantity,
    price
  );

  res.status(201).json({
    success: true,
    message: "Order item created successfully",
    orderItem,
  });
});

const getOrderItems = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const items = await orderService.getOrderItems(orderId);

  res.status(200).json({
    success: true,
    items,
  });
});

const getOrdersByRestaurantId = asyncHandler(async (req, res) => {
  const ownerId = req.owner.id;

  const orders = await orderService.getOrdersForAuthenticatedOwner(ownerId);

  res.status(200).json({
    success: true,
    orders,
  });
});

const checkout = asyncHandler(async (req, res) => {
  const studentId = req.student.id;

  const order = await orderService.checkout(studentId);

  res.status(201).json({
    success: true,
    message: "Checkout completed successfully",
    order,
  });
});

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  createOrderItem,
  getOrderItems,
  getOrdersByRestaurantId,
  checkout,
};