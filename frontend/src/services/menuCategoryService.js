import api from "./api";

// Get all menu categories
export const getAllMenuCategories = async () => {
  const response = await api.get("/menu-categories");
  return response.data;
};

// Create a menu category
export const createMenuCategory = async (name) => {
  const response = await api.post("/menu-categories", {
    name,
  });

  return response.data;
};