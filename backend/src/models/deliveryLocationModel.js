const pool = require("../config/database");

const getAllDeliveryLocations = async () => {
  const result = await pool.query(`
    SELECT *
    FROM delivery_locations
    ORDER BY location_name ASC
  `);

  return result.rows;
};

const createDeliveryLocation = async (
  locationName,
  deliveryFee
) => {

  const existing = await pool.query(
    `
    SELECT *
    FROM delivery_locations
    WHERE LOWER(location_name) = LOWER($1)
    `,
    [locationName]
  );

  if (existing.rows.length > 0) {
    throw new Error(
      "Delivery location already exists"
    );
  }

  const result = await pool.query(
    `
    INSERT INTO delivery_locations (
      location_name,
      delivery_fee
    )
    VALUES ($1, $2)
    RETURNING *;
    `,
    [locationName, deliveryFee]
  );

  return result.rows[0];
};

const deleteDeliveryLocation = async (
  id
) => {
  const result = await pool.query(
    `
    DELETE FROM delivery_locations
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  );

  return result.rows[0];
};

const updateDeliveryLocation = async (
  id,
  locationName,
  deliveryFee
) => {
  const result = await pool.query(
    `
    UPDATE delivery_locations
    SET
      location_name = $1,
      delivery_fee = $2
    WHERE id = $3
    RETURNING *;
    `,
    [
      locationName,
      deliveryFee,
      id,
    ]
  );

  return result.rows[0];
};

module.exports = {
  getAllDeliveryLocations,
  createDeliveryLocation,
  deleteDeliveryLocation,
  updateDeliveryLocation,
};