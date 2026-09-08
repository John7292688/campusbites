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




const sendPushNotification = require(
  "../utils/sendPushNotification"
);

router.get("/test-push", async (req, res) => {
  try {
    await sendPushNotification(
      "e87jSR8thl7P0t2jZioKJC:APA91bGeWTNxnjXbRudl96q47TSZmlfZgj3_xrEyA4eOPFT2MYzqJ0bQgd0UHzSX0klXLfXlPmfQc5DxG135jsK7Mjd-_r9PqUpU5sMGGXRLZc0slEedh6Y",
      "CampusBites Test",
      "Push notification is working!"
    );

    res.json({
      success: true,
      message: "Notification sent"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;