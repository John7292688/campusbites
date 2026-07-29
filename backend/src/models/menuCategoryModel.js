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

const updateMenuCategory = async (
  categoryId,
  name
) => {
  const result = await pool.query(
    `
    UPDATE menu_categories
    SET name = $1
    WHERE id = $2
    RETURNING *;
    `,
    [name, categoryId]
  );

  return result.rows[0];
};

const deleteMenuCategory = async (categoryId) => {
  const result = await pool.query(
    `
    DELETE FROM menu_categories
    WHERE id = $1
    RETURNING *;
    `,
    [categoryId]
  );

  return result.rows[0];
};

module.exports = {
  getAllMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
};