const cartService = require("../services/cartService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const addToCart = asyncHandler(async (req, res) => {
  const studentId = req.student.id;

  const {
    menuItemId,
    comboPackageId,
    customPlateId,
    quantity = 1,
  } = req.body;

  if (!menuItemId && !comboPackageId && !customPlateId) {
    throw new AppError(
      "Please provide a menu item, combo package, or custom plate.",
      400
    );
  }

  const cartItem = await cartService.addToCart({
    student_id: studentId,
    menu_item_id: menuItemId || null,
    combo_package_id: comboPackageId || null,
    custom_plate_id: customPlateId || null,
    quantity,
  });

  res.status(201).json({
    success: true,
    message: "Item added to cart successfully",
    cartItem,
  });
});

const getCartByStudentId = asyncHandler(async (req, res) => {
  const studentId = req.student.id;

  const cartItems = await cartService.getCartByStudentId(studentId);

  res.status(200).json({
    success: true,
    cartItems,
  });
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;
  const studentId = req.student.id;

  console.log("cartItemId:", cartItemId);
  console.log("quantity:", quantity);
  console.log("studentId:", studentId);

  const cartItem = await cartService.updateCartItemQuantity(
    cartItemId,
    studentId,
    quantity
  );

  if (!cartItem) {
    throw new AppError(
      "Cart item not found or you do not have permission to update it",
      404
    );
  }

  res.status(200).json({
    success: true,
    message: "Cart item updated successfully",
    cartItem,
  });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { cartItemId } = req.params;

  const studentId = req.student.id;

  const cartItem = await cartService.removeCartItem(
    cartItemId,
    studentId
  );

  if (!cartItem) {
    throw new AppError(
      "Cart item not found or you do not have permission to delete it",
      404
    );
  }

  res.status(200).json({
    success: true,
    message: "Cart item removed successfully",
    cartItem,
  });
});

module.exports = {
  addToCart,
  getCartByStudentId,
  updateCartItemQuantity,
  removeCartItem,
};