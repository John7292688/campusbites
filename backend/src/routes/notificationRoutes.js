const express = require("express");
const router = express.Router();

const notificationController = require(
  "../controllers/notificationController"
);

const restaurantOwnerAuthMiddleware = require(
  "../middleware/restaurantOwnerAuthMiddleware"
);

router.get(
  "/",
  restaurantOwnerAuthMiddleware,
  notificationController.getNotifications
);

router.patch(
  "/:notificationId/read",
  restaurantOwnerAuthMiddleware,
  notificationController.markAsRead
);

module.exports = router;