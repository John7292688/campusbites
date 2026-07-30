const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menuController");

const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");

router.post(
  "/",
  restaurantOwnerAuthMiddleware,
  menuController.createMenuItem
);

router.put(
  "/:menuItemId",
  restaurantOwnerAuthMiddleware,
  menuController.updateMenuItem
);

router.delete(
  "/:menuItemId",
  restaurantOwnerAuthMiddleware,
  menuController.deleteMenuItem
);

router.get("/item/:menuItemId", menuController.getMenuItemById);
router.get(
  "/restaurant/:restaurantId/available",
  menuController.getAvailableRestaurantMenu
);
router.get("/:restaurantId", menuController.getRestaurantMenu);

module.exports = router;