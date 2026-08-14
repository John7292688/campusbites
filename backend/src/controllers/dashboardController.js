const dashboardService = require("../services/dashboardService");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardSummary = asyncHandler(async (req, res) => {
  const ownerId = req.owner.id;

  const summary =
    await dashboardService.getDashboardSummary(ownerId);

  res.status(200).json({
    success: true,
    summary,
  });
});

const getRecentOrders = asyncHandler(async (req, res) => {
  const ownerId = req.owner.id;

  const orders =
    await dashboardService.getRecentOrders(ownerId);

  res.status(200).json({
    success: true,
    orders,
  });
});

const getTopSellingMenuItem = asyncHandler(
  async (req, res) => {
    const ownerId = req.owner.id;

    const item =
      await dashboardService.getTopSellingMenuItem(
        ownerId
      );

    res.status(200).json({
      success: true,
      item,
    });
  }
);

module.exports = {
  getDashboardSummary,
  getRecentOrders,
  getTopSellingMenuItem,
};