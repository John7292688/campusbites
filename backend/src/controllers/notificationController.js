const asyncHandler = require(
  "../utils/asyncHandler"
);

const notificationService = require(
  "../services/notificationService"
);

const getNotifications = asyncHandler(
  async (req, res) => {
    const ownerId = req.owner.id;

    const notifications =
      await notificationService.getNotificationsByOwnerId(
        ownerId
      );

    res.status(200).json({
      success: true,
      notifications,
    });
  }
);

const markAsRead = asyncHandler(
  async (req, res) => {
    const { notificationId } = req.params;

    const notification =
      await notificationService.markNotificationAsRead(
        notificationId
      );

    res.status(200).json({
      success: true,
      notification,
    });
  }
);

module.exports = {
  getNotifications,
  markAsRead,
};