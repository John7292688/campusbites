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

export async function getTopSellingMenuItem() {
  const response = await ownerApi.get(
    "/dashboard/top-selling-item"
  );

  return response.data.item;
}