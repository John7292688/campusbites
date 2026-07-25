import ownerApi from "./ownerApi";

export const getAllCategories = async () => {
  const response = await ownerApi.get("/categories");
  return response.data;
};