import api from "./api";
import ownerApi from "./ownerApi";

// Get restaurant menu
export const getRestaurantMenu = async (restaurantId) => {
  const response = await api.get(`/menus/${restaurantId}`);
  return response.data;
};

export const getAvailableRestaurantMenu = async (
  restaurantId
) => {
  const response = await api.get(
    `/menus/restaurant/${restaurantId}/available`
  );

  return response.data;
};

// Get one menu item
export const getMenuItemById = async (menuItemId) => {
  const response = await api.get(`/menus/item/${menuItemId}`);
  return response.data;
};

// Create menu item
export const createMenuItem = async (menuItemData) => {
  const response = await ownerApi.post(
    "/menus",
    menuItemData
  );

  return response.data;
};

// Update menu item
export const updateMenuItem = async (
  menuItemId,
  menuItemData
) => {
  const response = await ownerApi.put(
    `/menus/${menuItemId}`,
    menuItemData
  );

  return response.data;
};

// Delete menu item
export const deleteMenuItem = async (menuItemId) => {
  const response = await ownerApi.delete(
    `/menus/${menuItemId}`
  );

  return response.data;
};