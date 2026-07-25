import ownerApi from "./ownerApi";

// Get all packages
export const getAllPackages = async () => {
  const response = await ownerApi.get("/packages");
  return response.data;
};

// Get one package
export const getPackageById = async (packageId) => {
  const response = await ownerApi.get(`/packages/${packageId}`);
  return response.data;
};

// Get packages for a restaurant
export const getRestaurantPackages = async (restaurantId) => {
  const response = await ownerApi.get(
    `/packages/restaurant/${restaurantId}`
  );

  return response.data;
};

// Create package
export const createPackage = async (formData) => {
  const response = await ownerApi.post(
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
  const response = await ownerApi.put(
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
  const response = await ownerApi.delete(
    `/packages/${packageId}`
  );

  return response.data;
};