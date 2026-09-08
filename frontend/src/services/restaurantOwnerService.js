import ownerApi from "./ownerApi";

export const getProfile = async () => {
  const response = await ownerApi.get(
    "/restaurant-auth/profile"
  );

  return response.data;
};

export const updateProfile = async (
  profileData
) => {
  const response = await ownerApi.put(
    "/restaurant-auth/profile",
    profileData
  );

  return response.data;
};

export const changePassword = async (
  passwordData
) => {
  const response = await ownerApi.put(
    "/restaurant-auth/change-password",
    passwordData
  );

  return response.data;
};

export const toggleRestaurantStatus =
  async (is_open) => {
    const response =
      await ownerApi.patch(
        "/restaurants/toggle-status",
        { is_open }
      );

    return response.data;
  };