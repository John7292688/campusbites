const API_URL = "http://localhost:5000/api";

export async function getRestaurants() {
  try {
    const response = await fetch(`${API_URL}/restaurants`);

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    const data = await response.json();

    return data.restaurants;
  } catch (error) {
    console.error("Restaurant Service Error:", error);
    throw error;
  }
}

export async function getRestaurantById(id) {
  try {
    const response = await fetch(`${API_URL}/restaurants/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }

    const data = await response.json();

    return data.restaurant;
  } catch (error) {
    console.error("Restaurant Service Error:", error);
    throw error;
  }
}