const notificationModel = require(
  "../models/notificationModel"
);

const { getIO } = require("../socket");

const createNotification = async (
  ownerId,
  title,
  message
) => {
  const notification =
    await notificationModel.createNotification(
      ownerId,
      title,
      message
    );

  const io = getIO();

  if (io) {
    io.to(`owner_${ownerId}`).emit(
      "new_notification",
      notification
    );
  }
  return notification;
};

const getNotificationsByOwnerId = async (
  ownerId
) => {
  return await notificationModel.getNotificationsByOwnerId(
    ownerId
  );
};

const markNotificationAsRead = async (
  notificationId
) => {
  return await notificationModel.markNotificationAsRead(
    notificationId
  );
};

module.exports = {
  createNotification,
  getNotificationsByOwnerId,
  markNotificationAsRead,
};