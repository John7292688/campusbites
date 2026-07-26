const pool = require("../config/database");
// Get all combo packages
const getAllComboPackages = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        cp.*,
        r.name AS restaurant_name,
        cc.name AS category_name
      FROM combo_packages cp
      JOIN restaurants r
        ON cp.restaurant_id = r.id
      JOIN combo_categories cc
        ON cp.category_id = cc.id
      ORDER BY cp.created_at DESC;
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch combo packages",
    });
  }
};

// Get combo packages for one restaurant
const getRestaurantComboPackages = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const result = await pool.query(
      `
      SELECT
        cp.*,
        cc.name AS category_name
      FROM combo_packages cp
      JOIN combo_categories cc
        ON cp.category_id = cc.id
      WHERE cp.restaurant_id = $1
      ORDER BY cp.created_at DESC;
      `,
      [restaurantId]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant combo packages",
    });
  }
};

module.exports = {
  getAllComboPackages,
  getRestaurantComboPackages,
};