const {
  getAllComboCategories,
  getPublicComboCategories,
  createComboCategory,
  updateComboCategory,
  deleteComboCategory,
} = require("../models/comboCategoryModel");

const getCategories = async () => {
  return await getAllComboCategories();
};

const getPublicCategories = async () => {
  return await getPublicComboCategories();
};

const addCategory = async (
  name,
  icon
) => {
  return await createComboCategory(
    name,
    icon
  );
};

const updateCategory = async (
  id,
  name,
  icon
) => {
  return await updateComboCategory(
    id,
    name,
    icon
  );
};

const deleteCategory = async (
  id
) => {
  return await deleteComboCategory(
    id
  );
};

module.exports = {
  getCategories,
  getPublicCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};