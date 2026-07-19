const cartModel = require("../models/cartModel");

const addToCart = async (cartData) => {
  return await cartModel.addToCart(cartData);
};

const getCartByStudentId = async (studentId) => {
  return await cartModel.getCartByStudentId(studentId);
};

const updateCartItemQuantity = async (cartItemId, quantity) => {
  return await cartModel.updateCartItemQuantity(cartItemId, quantity);
};

const removeCartItem = async (cartItemId) => {
  return await cartModel.removeCartItem(cartItemId);
};

module.exports = {
  addToCart,
  getCartByStudentId,
  updateCartItemQuantity,
  removeCartItem,
};