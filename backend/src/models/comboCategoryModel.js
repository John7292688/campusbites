const pool = require("../config/database");

const getAllComboCategories = async () => {
  const result = await pool.query(`
    SELECT *
    FROM combo_categories
    ORDER BY name ASC
  `);

  return result.rows;
};

const createComboCategory = async (
  name
) => {
  const result = await pool.query(
    `
    INSERT INTO combo_categories (name)
    VALUES ($1)
    RETURNING *;
    `,
    [name]
  );

  return result.rows[0];
};

const updateComboCategory = async (
  id,
  name
) => {
  const result = await pool.query(
    `
    UPDATE combo_categories
    SET name = $1
    WHERE id = $2
    RETURNING *;
    `,
    [name, id]
  );

  return result.rows[0];
};

const deleteComboCategory = async (
  id
) => {
  await pool.query(
    `
    DELETE FROM combo_categories
    WHERE id = $1;
    `,
    [id]
  );
};

module.exports = {
  getAllComboCategories,
  createComboCategory,
  updateComboCategory,
  deleteComboCategory,
};