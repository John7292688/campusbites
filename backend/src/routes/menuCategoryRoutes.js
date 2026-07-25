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

module.exports = router;