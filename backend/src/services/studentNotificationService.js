const studentNotificationModel = require(
  "../models/studentNotificationModel"
);

const { getIO } = require("../socket");

const createNotification = async (
  studentId,
  title,
  message
) => {
  const notification =
    await studentNotificationModel.createNotification(
      studentId,
      title,
      message
    );

  const io = getIO();

  if (io) {
    io.to(`student_${studentId}`).emit(
      "new_student_notification",
      notification
    );
  }

  return notification;
};

const getNotificationsByStudentId = async (
  studentId
) => {
  return await studentNotificationModel.getNotificationsByStudentId(
    studentId
  );
};

const markNotificationAsRead = async (
  notificationId
) => {
  return await studentNotificationModel.markNotificationAsRead(
    notificationId
  );
};

module.exports = {
  createNotification,
  getNotificationsByStudentId,
  markNotificationAsRead,
};