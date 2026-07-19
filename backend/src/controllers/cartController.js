const cartService = require("../services/cartService");

const addToCart = async (req, res) => {
  try {
    // Get the logged-in student's ID from the JWT
    const studentId = req.student.id;

    const { menuItemId, quantity } = req.body;

    const cartItem = await cartService.addToCart({
      student_id: studentId,
      menu_item_id: menuItemId,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getCartByStudentId = async (req, res) => {
  try {
    // Get the logged-in student's ID from the JWT
    const studentId = req.student.id;

    const cartItems = await cartService.getCartByStudentId(studentId);

    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    // Get the authenticated student's ID
    const studentId = req.student.id;

    const cartItem = await cartService.updateCartItemQuantity(
      cartItemId,
      studentId,
      quantity
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found or you do not have permission to update it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    // Get the authenticated student's ID
    const studentId = req.student.id;

    const cartItem = await cartService.removeCartItem(
      cartItemId,
      studentId
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found or you do not have permission to delete it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  addToCart,
  getCartByStudentId,
  updateCartItemQuantity,
  removeCartItem,
};