const pool = require("../config/database");

const getAllMenuCategories = async () => {
  const result = await pool.query(`
    SELECT *
    FROM menu_categories
    ORDER BY id ASC
  `);

  return result.rows;
};

const createMenuCategory = async (name) => {
  const result = await pool.query(
    `
    INSERT INTO menu_categories (name)
    VALUES ($1)
    RETURNING *
    `,
    [name]
  );

  return result.rows[0];
};

module.exports = {
  getAllMenuCategories,
  createMenuCategory,
};