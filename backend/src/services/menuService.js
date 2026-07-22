const menuModel = require("../models/menuModel");
const restaurantModel = require("../models/restaurantModel");
const AppError = require("../utils/AppError");

const createMenuItem = async (menuData, ownerId) => {
  const restaurant = await restaurantModel.getRestaurantById(
    menuData.restaurant_id
  );

  if (!restaurant) {
    throw new AppError("Restaurant not found", 404);
  }

  if (restaurant.owner_id !== ownerId) {
    throw new AppError(
      "You can only add menu items to your own restaurant",
      403
    );
  }

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