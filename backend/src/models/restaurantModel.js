const pool = require("../config/database");

const createRestaurant = async (restaurantData) => {
  const {
    name,
    description,
    location,
    phone,
    image_url,
    logo_url,
    owner_id,
  } = restaurantData;

  const result = await pool.query(
    `
    INSERT INTO restaurants
    (
      name,
      description,
      location,
      phone,
      image_url,
      logo_url,
      owner_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,
    [
      name,
      description,
      location,
      phone,
      image_url,
      logo_url,
      owner_id,
    ]
  );

  return result.rows[0];
};

const getAllRestaurants = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM restaurants
    ORDER BY created_at DESC;
    `
  );

  return result.rows;
};

const getRestaurantById = async (restaurantId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM restaurants
    WHERE id = $1;
    `,
    [restaurantId]
  );

  return result.rows[0];
};

const getRestaurantByOwnerId = async (ownerId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM restaurants
    WHERE owner_id = $1;
    `,
    [ownerId]
  );

  return result.rows[0];
};

const updateRestaurantByOwnerId = async (
  ownerId,
  restaurantData
) => {
  const {
    name,
    description,
    location,
    phone,
    image_url,
    logo_url,
  } = restaurantData;

  const result = await pool.query(
    `
    UPDATE restaurants
    SET
      name = $1,
      description = $2,
      location = $3,
      phone = $4,
      image_url = $5,
      logo_url = $6
    WHERE owner_id = $7
    RETURNING *;
    `,
    [
      name,
      description,
      location,
      phone,
      image_url,
      logo_url,
      ownerId,
    ]
  );

  return result.rows[0];
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByOwnerId,
  updateRestaurantByOwnerId,
};