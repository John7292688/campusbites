const menuCategoryModel = require("../models/menuCategoryModel");

const getAllMenuCategories = async () => {
  return await menuCategoryModel.getAllMenuCategories();
};

const createMenuCategory = async (name) => {
  return await menuCategoryModel.createMenuCategory(name);
};

const updateMenuCategory = async (
  categoryId,
  name
) => {
  return await menuCategoryModel.updateMenuCategory(
    categoryId,
    name
  );
};

const deleteMenuCategory = async (categoryId) => {
  return await menuCategoryModel.deleteMenuCategory(
    categoryId
  );
};

module.exports = {
  getAllMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
};