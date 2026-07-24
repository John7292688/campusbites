const express = require("express");
const router = express.Router();

const {
  getAllComboPackages,
} = require("../controllers/comboPackageController");

// Get all combo packages
router.get("/", getAllComboPackages);

module.exports = router;