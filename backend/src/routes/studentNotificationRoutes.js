const express = require("express");
const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getNotifications,
  markAsRead,
} = require(
  "../controllers/studentNotificationController"
);

router.get(
  "/",
  authMiddleware,
  getNotifications
);

router.patch(
  "/:notificationId/read",
  authMiddleware,
  markAsRead
);

module.exports = router;