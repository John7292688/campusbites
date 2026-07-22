const menuService = require("../services/menuService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const createMenuItem = asyncHandler(async (req, res) => {
  const {
    restaurant_id,
    name,
    description,
    price,
    image_url,
  } = req.body;

  const menuItem = await menuService.createMenuItem({
    restaurant_id,
    name,
    description,
    price,
    image_url,
  });

  res.status(201).json({
    success: true,
    message: "Menu item created successfully",
    menuItem,
  });
});

const getRestaurantMenu = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  const menuItems = await menuService.getRestaurantMenu(restaurantId);

  res.status(200).json({
    success: true,
    menuItems,
  });
});

const getMenuItemById = asyncHandler(async (req, res) => {
  const { menuItemId } = req.params;

  const menuItem = await menuService.getMenuItemById(menuItemId);

  if (!menuItem) {
    throw new AppError("Menu item not found", 404);
  }

  res.status(200).json({
    success: true,
    menuItem,
  });
});

module.exports = {
  createMenuItem,
  getRestaurantMenu,
  getMenuItemById,
};