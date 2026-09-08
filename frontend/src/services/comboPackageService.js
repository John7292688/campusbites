import api from "./api";

// Get combo packages for one restaurant
export const getRestaurantComboPackages = async (
  restaurantId
) => {
  const response = await api.get(
    `/combo-packages/restaurant/${restaurantId}`
  );

  return response.data;
};

// Get all combo packages
export const getAllComboPackages = async () => {
  const response = await api.get("/combo-packages");
  return response.data.data;
};

// Get all public combo packages
export const getPublicPackages = async () => {
  const response = await api.get(
    "/combo-packages/public"
  );

  return response.data.data;
};