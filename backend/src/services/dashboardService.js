const dashboardModel = require("../models/dashboardModel");

const getDashboardSummary = async (ownerId) => {
  return await dashboardModel.getDashboardSummary(ownerId);
};

const getRecentOrders = async (ownerId) => {
  return await dashboardModel.getRecentOrders(ownerId);
};

module.exports = {
  getDashboardSummary,
  getRecentOrders,
};