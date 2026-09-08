import api from "./api";

export const updateProfile = async (
  full_name,
  phone,
  email
) => {
  const token =
    localStorage.getItem("token");

  const response = await api.put(
    "/auth/profile",
    {
      full_name,
      phone,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};