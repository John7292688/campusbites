const {
  getDashboardStats,
} = require(
  "../models/adminDashboardModel"
);

const fetchDashboardStats =
  async () => {
    return await getDashboardStats();
  };

module.exports = {
  fetchDashboardStats,
};