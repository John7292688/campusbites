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

// Update a menu category
export const updateMenuCategory = async (
  categoryId,
  name
) => {
  const response = await api.put(
    `/menu-categories/${categoryId}`,
    {
      name,
    }
  );

  return response.data;
};

// Delete a menu category
export const deleteMenuCategory = async (
  categoryId
) => {
  const response = await api.delete(
    `/menu-categories/${categoryId}`
  );

  return response.data;
};