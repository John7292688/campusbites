import api from "./api";

// Get all restaurants
export const getRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data.restaurants;
};

// Get restaurant by ID
export const getRestaurantById = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data.restaurant;
};

// Get logged-in owner's restaurant
export const getMyRestaurant = async () => {
  const response = await api.get("/restaurants/my-restaurant");
  return response.data.restaurant;
};