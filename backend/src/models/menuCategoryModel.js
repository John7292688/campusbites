const pool = require("../config/database");

const getAllMenuCategories = async () => {
  const result = await pool.query(`
    SELECT
      mc.*,
      COUNT(m.id) AS menu_count
    FROM menu_categories mc
    LEFT JOIN menus m
      ON mc.id = m.menu_category_id
    GROUP BY mc.id
    ORDER BY mc.id ASC
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