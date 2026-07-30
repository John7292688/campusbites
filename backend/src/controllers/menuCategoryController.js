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

const updateMenuCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category =
      await menuCategoryService.updateMenuCategory(
        categoryId,
        name.trim()
      );

    res.status(200).json({
      success: true,
      message: "Menu category updated successfully",
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

const deleteMenuCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    await menuCategoryService.deleteMenuCategory(
      categoryId
    );

    res.status(200).json({
      success: true,
      message: "Menu category deleted successfully",
    });
  } catch (error) {
  console.error(error);

  // Category is being used by menu items
  if (error.code === "23001") {
    return res.status(400).json({
      success: false,
      message:
        "This category cannot be deleted because it contains menu items. Please move or delete those menu items first.",
    });
  }

  res.status(500).json({
    success: false,
    message: error.message || "Failed to delete menu category.",
  });
}
};

module.exports = {
  getAllMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
};