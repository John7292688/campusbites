const express = require("express");
const router = express.Router();

const packageController = require("../controllers/packageController");
const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");
const upload = require("../middleware/upload");

// ==============================
// Public Routes
// ==============================
// Public packages for students
router.get(
  "/public",
  packageController.getPublicPackages
);
// Get all combo packages
router.get(
  "/",
  restaurantOwnerAuthMiddleware,
  packageController.getAllPackages
);

// Get packages belonging to a restaurant
router.get(
  "/restaurant/:restaurantId",
  packageController.getPackagesByRestaurant
);

// Get a single package
router.get(
  "/:packageId",
  packageController.getPackageById
);

// ==============================
// Protected Routes
// ==============================

// Create package
router.post(
  "/",
  restaurantOwnerAuthMiddleware,
  upload.single("image"),
  packageController.createPackage
);

// Update package (supports image upload)
router.put(
  "/:packageId",
  restaurantOwnerAuthMiddleware,
  upload.single("image"),
  packageController.updatePackage
);

// Delete package
router.delete(
  "/:packageId",
  restaurantOwnerAuthMiddleware,
  packageController.deletePackage
);

module.exports = router;