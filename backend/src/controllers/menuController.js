const menuService = require("../services/menuService");

const createMenuItem = async (req, res) => {
  try {
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

    return res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      menuItem,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getRestaurantMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const menuItems = await menuService.getRestaurantMenu(restaurantId);

    return res.status(200).json({
      success: true,
      menuItems,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const { menuItemId } = req.params;

    const menuItem = await menuService.getMenuItemById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      menuItem,
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
  createMenuItem,
  getRestaurantMenu,
  getMenuItemById,
};