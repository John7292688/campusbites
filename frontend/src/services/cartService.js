const API_URL = "http://localhost:5000/api";

export async function addToCart(menuItemId, quantity = 1) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      menuItemId,
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add item to cart");
  }

  return data;
}

export async function getCart() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch cart");
  }

  return data.cartItems;
}

export async function updateCartItemQuantity(cartItemId, quantity) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update cart item");
  }

  return data;
}

export async function removeCartItem(cartItemId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove cart item");
  }

  return data;
}