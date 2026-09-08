import ownerApi from "./ownerApi";

const API_URL = "http://localhost:5000/api";

export async function checkout(
  deliveryLocationId,
  deliveryAddress,
  addressNote
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/orders/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        deliveryLocationId,
        deliveryAddress,
        addressNote,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Checkout failed"
    );
  }

  return data;
}

export async function getMyOrders() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data.orders;
}

export async function getLatestDeliveryInfo() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/orders/latest-delivery-info`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch delivery info"
    );
  }

  return data.deliveryInfo;
}

export async function getOrderItems(orderId) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/orders/${orderId}/items`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch order items");
  }

  return data.items;
}

// ===============================
// Restaurant Owner
// ===============================

export async function getRestaurantOrders() {
  const response = await ownerApi.get("/orders/restaurant");

  console.log(
    "SERVICE RESPONSE:",
    response.data.orders[0]
  );

  return response.data.orders;
}

export async function getRestaurantOrderItems(orderId) {
  const response = await ownerApi.get(
    `/orders/${orderId}/items`
  );

  return response.data.items;
}

export async function updateRestaurantOrderStatus(
  orderId,
  status
) {
  const response = await ownerApi.patch(
    `/orders/${orderId}/status`,
    {
      status,
    }
  );

  return response.data.order;
}