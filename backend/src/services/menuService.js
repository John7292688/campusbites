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

const updateMenuItem = async (
  menuItemId,
  menuData,
  ownerId
) => {
  const menuItem = await menuModel.getMenuItemById(menuItemId);

  if (!menuItem) {
    throw new AppError("Menu item not found", 404);
  }

  const restaurant = await restaurantModel.getRestaurantById(
    menuItem.restaurant_id
  );

  if (!restaurant) {
    throw new AppError("Restaurant not found", 404);
  }

  if (restaurant.owner_id !== ownerId) {
    throw new AppError(
      "You can only update menu items in your own restaurant",
      403
    );
  }

  return await menuModel.updateMenuItem(
    menuItemId,
    menuData
  );
};

module.exports = {
  createMenuItem,
  getRestaurantMenu,
  getMenuItemById,
  updateMenuItem,
};