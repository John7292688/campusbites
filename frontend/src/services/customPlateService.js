const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export async function createCustomPlate(
  restaurantId,
  items
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/custom-plates`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        restaurantId,
        items,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to create custom plate."
    );
  }

  return data;
}