const comboCategoryService = require(
  "../services/comboCategoryService"
);

const getAllCategories = async (
  req,
  res
) => {
  const categories =
    await comboCategoryService.getCategories();

  res.json({
    success: true,
    categories,
  });
};

const getPublicCategories = async (
  req,
  res
) => {
  const categories =
    await comboCategoryService.getPublicCategories();

  res.json({
    success: true,
    categories,
  });
};

const createCategory = async (
  req,
  res
) => {
  const {
  name,
  icon = "🍽️",
} = req.body;

const category =
  await comboCategoryService.addCategory(
    name,
    icon
  );

  res.status(201).json({
    success: true,
    message:
      "Category created successfully",
    category,
  });
};

const updateCategory = async (
  req,
  res
) => {
  const { id } = req.params;

  const {
  name,
  icon = "🍽️",
} = req.body;

const category =
  await comboCategoryService.updateCategory(
    id,
    name,
    icon
  );

  res.json({
    success: true,
    message:
      "Category updated successfully",
    category,
  });
};

const deleteCategory = async (
  req,
  res
) => {
  const { id } = req.params;

  await comboCategoryService.deleteCategory(
    id
  );

  res.json({
    success: true,
    message:
      "Category deleted successfully",
  });
};

module.exports = {
  getAllCategories,
  getPublicCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};