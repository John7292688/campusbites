const pool = require("../config/database");

const createMenuItem = async (menuData) => {
  const {
    restaurant_id,
    name,
    description,
    price,
    image_url,
  } = menuData;

  const result = await pool.query(
    `INSERT INTO menus
    (restaurant_id, name, description, price, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [
      restaurant_id,
      name,
      description,
      price,
      image_url,
    ]
  );

  return result.rows[0];
};

const getRestaurantMenu = async (restaurantId) => {
  const result = await pool.query(
    `SELECT *
     FROM menus
     WHERE restaurant_id = $1
     ORDER BY created_at DESC`,
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

const updateMenuItem = async (menuItemId, menuData) => {
  const {
    name,
    description,
    price,
    image_url,
    is_available,
  } = menuData;

  const result = await pool.query(
    `UPDATE menus
     SET
       name = $1,
       description = $2,
       price = $3,
       image_url = $4,
       is_available = $5
     WHERE id = $6
     RETURNING *`,
    [
      name,
      description,
      price,
      image_url,
      is_available,
      menuItemId,
    ]
  );

  return result.rows[0];
};

module.exports = {
  createMenuItem,
  getRestaurantMenu,
  getMenuItemById,
  updateMenuItem,
};

