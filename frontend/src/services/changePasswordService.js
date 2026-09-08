import api from "./api";

export const changePassword = async (
  currentPassword,
  newPassword
) => {
  const token =
    localStorage.getItem("token");

  const response = await api.put(
    "/auth/change-password",
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};