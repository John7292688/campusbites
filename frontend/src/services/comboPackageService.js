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