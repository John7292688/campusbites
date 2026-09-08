const {
  fetchDashboardStats,
} = require(
  "../services/adminDashboardService"
);

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const stats =
      await fetchDashboardStats();

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};