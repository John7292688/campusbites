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
    const order = await orderService.checkout();

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
  createOrderItem,
  getOrderItems,
  checkout,
};