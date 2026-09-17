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
  name,
  icon
) => {
  const result = await pool.query(
    `
    INSERT INTO combo_categories (name, icon)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [name, icon]
  );

  return result.rows[0];
};

const updateComboCategory = async (
  id,
  name,
  icon
) => {
  const result = await pool.query(
    `
    UPDATE combo_categories
    SET
      name = $1,
      icon = $2
    WHERE id = $3
    RETURNING *;
    `,
    [name, icon, id]
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