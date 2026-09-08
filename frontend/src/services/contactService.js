const API_URL = "http://localhost:5000/api";

export async function sendContactMessage(
  name,
  email,
  subject,
  message
) {
  const response = await fetch(
    `${API_URL}/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to send message"
    );
  }

  return data;
}

export async function getAllMessages() {
  const response = await fetch(
    `${API_URL}/contact`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch messages"
    );
  }

  return data.messages;
}

export async function markMessageAsRead(id) {
  const response = await fetch(
    `${API_URL}/contact/${id}/read`,
    {
      method: "PATCH",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to mark message as read"
    );
  }

  return data.message;
}