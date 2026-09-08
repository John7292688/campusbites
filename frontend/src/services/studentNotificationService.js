import api from "./api";

export const getStudentNotifications =
  async () => {
    const response = await api.get(
      "/student-notifications"
    );

    return response.data.notifications;
  };

export const markNotificationAsRead =
  async (notificationId) => {
    const response = await api.patch(
      `/student-notifications/${notificationId}/read`
    );

    return response.data.notification;
  };