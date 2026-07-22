const pool = require("../config/database");

const createRestaurant = async (restaurantData) => {
  const {
    name,
    description,
    location,
    phone,
    image_url,
    owner_id,
  } = restaurantData;

  const result = await pool.query(
    `INSERT INTO restaurants
    (name, description, location, phone, image_url, owner_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [name, description, location, phone, image_url, owner_id]
  );

  return result.rows[0];
};

const getAllRestaurants = async () => {
  const result = await pool.query(
    "SELECT * FROM restaurants ORDER BY created_at DESC"
  );

  return result.rows;
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
};