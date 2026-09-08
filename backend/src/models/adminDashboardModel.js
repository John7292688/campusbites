const pool = require("../config/database");

const getDashboardStats = async () => {
  const totalRestaurants = await pool.query(`
    SELECT COUNT(*) AS count
    FROM restaurants
  `);

  const approvedRestaurants = await pool.query(`
    SELECT COUNT(*) AS count
    FROM restaurants
    WHERE status = 'approved'
  `);

  const pendingRestaurants = await pool.query(`
    SELECT COUNT(*) AS count
    FROM restaurants
    WHERE status = 'pending'
  `);

  const suspendedRestaurants = await pool.query(`
    SELECT COUNT(*) AS count
    FROM restaurants
    WHERE status = 'suspended'
  `);

  const recentRestaurants = await pool.query(`
    SELECT *
    FROM restaurants
    ORDER BY created_at DESC
    LIMIT 5
  `);

  return {
    totalRestaurants: Number(
      totalRestaurants.rows[0].count
    ),

    approvedRestaurants: Number(
      approvedRestaurants.rows[0].count
    ),

    pendingRestaurants: Number(
      pendingRestaurants.rows[0].count
    ),

    suspendedRestaurants: Number(
      suspendedRestaurants.rows[0].count
    ),

    recentRestaurants:
      recentRestaurants.rows,
  };
};

module.exports = {
  getDashboardStats,
};