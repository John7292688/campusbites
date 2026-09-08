const {
  getAllComboCategories,
  createComboCategory,
  updateComboCategory,
  deleteComboCategory,
} = require("../models/comboCategoryModel");

const getCategories = async () => {
  return await getAllComboCategories();
};

const addCategory = async (name) => {
  return await createComboCategory(name);
};

const updateCategory = async (
  id,
  name
) => {
  return await updateComboCategory(
    id,
    name
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
  addCategory,
  updateCategory,
  deleteCategory,
};