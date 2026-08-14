import ownerApi from "./ownerApi";

export const getNotifications = async () => {
  const response = await ownerApi.get(
    "/notifications"
  );

  return response.data.notifications;
};

export const markNotificationAsRead = async (
  notificationId
) => {
  const response = await ownerApi.patch(
    `/notifications/${notificationId}/read`
  );

  return response.data.notification;
};