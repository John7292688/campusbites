import ownerApi from "./ownerApi";

export const getDashboardSummary = async () => {
  const response = await ownerApi.get("/dashboard/summary");

  return response.data.summary;
};

export const getRecentOrders = async () => {
  const response = await ownerApi.get(
    "/dashboard/recent-orders"
  );

  return response.data.orders;
};