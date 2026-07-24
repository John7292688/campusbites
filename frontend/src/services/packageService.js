import api from "./api";

// Get all packages
export const getAllPackages = async () => {
  const response = await api.get("/packages");
  return response.data;
};

// Get one package
export const getPackageById = async (packageId) => {
  const response = await api.get(`/packages/${packageId}`);
  return response.data;
};

// Get packages for a restaurant
export const getRestaurantPackages = async (restaurantId) => {
  const response = await api.get(
    `/packages/restaurant/${restaurantId}`
  );

  return response.data;
};

// Create package
export const createPackage = async (formData) => {
  const response = await api.post(
    "/packages",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update package
export const updatePackage = async (
  packageId,
  formData
) => {
  const response = await api.put(
    `/packages/${packageId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete package
export const deletePackage = async (packageId) => {
  const response = await api.delete(
    `/packages/${packageId}`
  );

  return response.data;
};