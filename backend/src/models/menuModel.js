const pool = require("../config/database");

const createMenuItem = async (menuData) => {
  const {
    restaurant_id,
    menu_category_id,
    name,
    price,
    unit,
    is_available,
  } = menuData;

  const result = await pool.query(
    `INSERT INTO menus
    (
      restaurant_id,
      menu_category_id,
      name,
      price,
      unit,
      is_available
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      restaurant_id,
      menu_category_id,
      name,
      price,
      unit,
      is_available,
    ]
  );

  return result.rows[0];
};

const getRestaurantMenu = async (restaurantId) => {
  const result = await pool.query(
    `SELECT
        m.*,
        mc.name AS category_name
     FROM menus m
     JOIN menu_categories mc
       ON mc.id = m.menu_category_id
     WHERE m.restaurant_id = $1
     ORDER BY mc.id ASC, m.name ASC`,
    [restaurantId]
  );

  return result.rows;
};

const getAvailableRestaurantMenu = async (restaurantId) => {
  const result = await pool.query(
    `SELECT
        m.*,
        mc.name AS category_name
     FROM menus m
     JOIN menu_categories mc
       ON mc.id = m.menu_category_id
     WHERE m.restaurant_id = $1
       AND m.is_available = TRUE
     ORDER BY mc.id ASC, m.name ASC`,
    [restaurantId]
  );

  return result.rows;
};

const getMenuItemById = async (menuItemId) => {
  const result = await pool.query(
    `SELECT *
     FROM menus
     WHERE id = $1`,
    [menuItemId]
  );

  return result.rows[0];
};

const getMenuItemByRestaurant = async (
  menuItemId,
  restaurantId
) => {
  const result = await pool.query(
    `SELECT *
     FROM menus
     WHERE id = $1
       AND restaurant_id = $2`,
    [menuItemId, restaurantId]
  );

  return result.rows[0];
};

const updateMenuItem = async (
  menuItemId,
  menuData
) => {
  const {
    menu_category_id,
    name,
    price,
    unit,
    is_available,
  } = menuData;

  const result = await pool.query(
    `UPDATE menus
     SET
       menu_category_id = $1,
       name = $2,
       price = $3,
       unit = $4,
       is_available = $5
     WHERE id = $6
     RETURNING *`,
    [
      menu_category_id,
      name,
      price,
      unit,
      is_available,
      menuItemId,
    ]
  );

  return result.rows[0];
};

const deleteMenuItem = async (menuItemId) => {
  const result = await pool.query(
    `DELETE FROM menus
     WHERE id = $1
     RETURNING *`,
    [menuItemId]
  );

  return result.rows[0];
};

module.exports = {
  createMenuItem,
  getRestaurantMenu,
  getAvailableRestaurantMenu,
  getMenuItemById,
  getMenuItemByRestaurant,
  updateMenuItem,
  deleteMenuItem,
};