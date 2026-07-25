const menuCategoryModel = require("../models/menuCategoryModel");

const getAllMenuCategories = async () => {
  return await menuCategoryModel.getAllMenuCategories();
};

const createMenuCategory = async (name) => {
  return await menuCategoryModel.createMenuCategory(name);
};

module.exports = {
  getAllMenuCategories,
  createMenuCategory,
};