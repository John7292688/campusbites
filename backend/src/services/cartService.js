const cartModel = require("../models/cartModel");

const addToCart = async (cartData) => {
  return await cartModel.addToCart(cartData);
};

module.exports = {
  addToCart,
};