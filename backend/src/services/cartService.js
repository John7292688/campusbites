const cartModel = require("../models/cartModel");

const addToCart = (cartData) => {
  return cartModel.addToCart(cartData);
};

const getCartByStudentId = (studentId) => {
  return cartModel.getCartByStudentId(studentId);
};

const updateCartItemQuantity = (
  cartItemId,
  studentId,
  quantity
) => {
  return cartModel.updateCartItemQuantity(
    cartItemId,
    studentId,
    quantity
  );
};

const removeCartItem = (cartItemId, studentId) => {
  return cartModel.removeCartItem(cartItemId, studentId);
};

module.exports = {
  addToCart,
  getCartByStudentId,
  updateCartItemQuantity,
  removeCartItem,
};