const express = require("express");
const router = express.Router();

const menuCategoryController = require("../controllers/menuCategoryController");

// Get all menu categories
router.get(
  "/",
  menuCategoryController.getAllMenuCategories
);

// Create a menu category
router.post(
  "/",
  menuCategoryController.createMenuCategory
);

// Update a menu category
router.put(
  "/:categoryId",
  menuCategoryController.updateMenuCategory
);

// Delete a menu category
router.delete(
  "/:categoryId",
  menuCategoryController.deleteMenuCategory
);

module.exports = router;