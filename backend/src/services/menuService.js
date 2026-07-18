const menuModel = require("../models/menuModel");

const createMenuItem = async (menuData) => {
  return await menuModel.createMenuItem(menuData);
};

const getRestaurantMenu = async (restaurantId) => {
  return await menuModel.getRestaurantMenu(restaurantId);
};

const getMenuItemById = async (menuItemId) => {
  return await menuModel.getMenuItemById(menuItemId);
};

module.exports = {
  createMenuItem,
  getRestaurantMenu,
  getMenuItemById,
};