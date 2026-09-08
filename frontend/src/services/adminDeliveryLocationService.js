const API_URL =
  import.meta.env.VITE_API_URL;

export async function getDeliveryLocations() {
  const response = await fetch(
    `${API_URL}/api/delivery-locations`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to load delivery locations"
    );
  }

  return data;
}

export async function createDeliveryLocation(
  locationName,
  deliveryFee
) {
  const response = await fetch(
    `${API_URL}/api/delivery-locations`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        location_name: locationName,
        delivery_fee: deliveryFee,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to create location"
    );
  }

  return data;
}

export async function deleteDeliveryLocation(
  id
) {
  const response = await fetch(
    `${API_URL}/api/delivery-locations/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to delete location"
    );
  }

  return data;
}

export async function updateDeliveryLocation(
  id,
  locationName,
  deliveryFee
) {
  const response = await fetch(
    `${API_URL}/api/delivery-locations/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        location_name: locationName,
        delivery_fee: deliveryFee,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update location"
    );
  }

  return data;
}