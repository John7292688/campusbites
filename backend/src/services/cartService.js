const cartModel = require("../models/cartModel");

const addToCart = async (cartData) => {
  return await cartModel.addToCart(cartData);
};

const getCartByStudentId = async (studentId) => {
  return await cartModel.getCartByStudentId(studentId);
};

const updateCartItemQuantity = async (cartItemId, studentId, quantity) => {
  return await cartModel.updateCartItemQuantity(
    cartItemId,
    studentId,
    quantity
  );
};

const removeCartItem = async (cartItemId, studentId) => {
  return await cartModel.removeCartItem(cartItemId, studentId);
};

module.exports = {
  addToCart,
  getCartByStudentId,
  updateCartItemQuantity,
  removeCartItem,
};