const menuCategoryService = require("../services/menuCategoryService");

const getAllMenuCategories = async (req, res) => {
  try {
    const categories =
      await menuCategoryService.getAllMenuCategories();

    res.status(200).json({
      success: true,
      message: "Menu categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve menu categories",
    });
  }
};

const createMenuCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category =
      await menuCategoryService.createMenuCategory(
        name.trim()
      );

    res.status(201).json({
      success: true,
      message: "Menu category created successfully",
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllMenuCategories,
  createMenuCategory,
};