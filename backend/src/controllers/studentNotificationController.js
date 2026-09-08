const asyncHandler = require(
  "../utils/asyncHandler"
);

const studentNotificationService = require(
  "../services/studentNotificationService"
);

const getNotifications = asyncHandler(
  async (req, res) => {
    const studentId = req.student.id;

    const notifications =
      await studentNotificationService.getNotificationsByStudentId(
        studentId
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
      await studentNotificationService.markNotificationAsRead(
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