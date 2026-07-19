const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const { studentId, totalAmount } = req.body;

    const order = await orderService.createOrder(studentId, totalAmount);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
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
  return res.status(400).json({
    success: false,
    message: "Invalid order status",
  });
}

    const order = await orderService.updateOrderStatus(orderId, status);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

const createOrderItem = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create order item",
    });
  }
};

const getOrderItems = async (req, res) => {
  try {
    const { orderId } = req.params;

    const items = await orderService.getOrderItems(orderId);

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve order items",
    });
  }
};

const checkout = async (req, res) => {
  try {
    const studentId = req.student.id;

    const order = await orderService.checkout(studentId);

    res.status(201).json({
      success: true,
      message: "Checkout completed successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Checkout failed",
    });
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