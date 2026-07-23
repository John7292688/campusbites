const API_URL = "http://localhost:5000/api";

export async function getRestaurantMenu(restaurantId) {
  try {
    const response = await fetch(`${API_URL}/menus/${restaurantId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch menu");
    }

    const data = await response.json();

    return data.menuItems;
  } catch (error) {
    console.error("Menu Service Error:", error);
    throw error;
  }
}