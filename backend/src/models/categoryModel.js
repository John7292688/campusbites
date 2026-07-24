const pool = require("../config/database");

const getAllCategories = async () => {
  const query = `
    SELECT
      id,
      name
    FROM combo_categories
    ORDER BY name ASC
  `;

  const { rows } = await pool.query(query);

  return rows;
};

module.exports = {
  getAllCategories,
};