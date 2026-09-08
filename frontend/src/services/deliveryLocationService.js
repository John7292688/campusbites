import api from "./api";

export const getDeliveryLocations =
  async () => {
    const response =
      await api.get(
        "/delivery-locations"
      );

    return response.data;
  };