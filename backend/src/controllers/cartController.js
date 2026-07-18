const cartService = require("../services/cartService");

const addToCart = async (req, res) => {
  try {
    const {
      student_id,
      menu_item_id,
      quantity,
    } = req.body;

    const cartItem = await cartService.addToCart({
      student_id,
      menu_item_id,
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

module.exports = {
  addToCart,
};