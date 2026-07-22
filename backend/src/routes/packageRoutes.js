const express = require("express");
const router = express.Router();

const packageController = require("../controllers/packageController");
const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");

// Public Routes
router.get(
  "/restaurant/:restaurantId",
  packageController.getPackagesByRestaurant
);

router.get(
  "/:packageId",
  packageController.getPackageById
);

router.get(
  "/:packageId/items",
  packageController.getPackageItems
);

// Protected Routes (Restaurant Owners Only)
router.post(
  "/",
  restaurantOwnerAuthMiddleware,
  packageController.createPackage
);

router.put(
  "/:packageId",
  restaurantOwnerAuthMiddleware,
  packageController.updatePackage
);

router.delete(
  "/:packageId",
  restaurantOwnerAuthMiddleware,
  packageController.deletePackage
);

router.post(
  "/:packageId/items",
  restaurantOwnerAuthMiddleware,
  packageController.addMenuItemToPackage
);

router.delete(
  "/:packageId/items/:menuId",
  restaurantOwnerAuthMiddleware,
  packageController.removeMenuItemFromPackage
);

module.exports = router;