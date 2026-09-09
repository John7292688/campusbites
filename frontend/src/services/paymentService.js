const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export async function initializePayment(
  orderId,
  email
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/payments/initialize`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId,
        email,
        paymentMethod: "Paystack",
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to initialize payment"
    );
  }

  return data.data;
}

export async function verifyPayment(
  reference
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/payments/verify/${reference}`,
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
        "Failed to verify payment"
    );
  }

  return data.data;
}