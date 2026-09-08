const pool = require("../config/database");

// Create Package
const createPackage = async ({
  restaurantId,
  categoryId,
  name,
  description,
  price,
  image,
  itemsIncluded,
}) => {
  const result = await pool.query(
    `
    INSERT INTO combo_packages (
      restaurant_id,
      category_id,
      name,
      description,
      price,
      image,
      items_included
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,
    [
      restaurantId,
      categoryId,
      name,
      description,
      price,
      image,
      itemsIncluded,
    ]
  );

  return result.rows[0];
};

// Get All Packages
const restaurantModel = require("./restaurantModel");

const getAllPackages = async (ownerId) => {
  // Find the restaurant owned by this user
  const restaurant =
    await restaurantModel.getRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    return [];
  }

  const result = await pool.query(
    `
    SELECT
      cp.*,
      r.name AS restaurant_name,
      r.image_url AS restaurant_image,
      cc.name AS category_name
    FROM combo_packages cp
    JOIN restaurants r
      ON cp.restaurant_id = r.id
    JOIN combo_categories cc
      ON cp.category_id = cc.id
    WHERE cp.restaurant_id = $1
    ORDER BY cp.created_at DESC;
    `,
    [restaurant.id]
  );

  return result.rows;
};

// Get Package By ID
const getPackageById = async (packageId) => {
  const result = await pool.query(
    `
    SELECT
      cp.*,
      r.name AS restaurant_name,
      r.image_url AS restaurant_image,
      cc.name AS category_name
    FROM combo_packages cp
    JOIN restaurants r
      ON cp.restaurant_id = r.id
    JOIN combo_categories cc
      ON cp.category_id = cc.id
    WHERE cp.id = $1;
    `,
    [packageId]
  );

  return result.rows[0];
};

// Get Packages By Restaurant
const getPackagesByRestaurant = async (restaurantId) => {
  const result = await pool.query(
    `
    SELECT
      cp.*,
      cc.name AS category_name
    FROM combo_packages cp
    JOIN combo_categories cc
      ON cp.category_id = cc.id
    WHERE cp.restaurant_id = $1
      AND cp.is_available = TRUE
    ORDER BY cp.created_at DESC;
    `,
    [restaurantId]
  );

  return result.rows;
};

// Update Package
const updatePackage = async (
  packageId,
  {
    categoryId,
    name,
    description,
    price,
    image,
    itemsIncluded,
    isAvailable,
  }
) => {
  const result = await pool.query(
    `
    UPDATE combo_packages
    SET
      category_id = $1,
      name = $2,
      description = $3,
      price = $4,
      image = $5,
      items_included = $6,
      is_available = $7,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $8
    RETURNING *;
    `,
    [
      categoryId,
      name,
      description,
      price,
      image,
      itemsIncluded,
      isAvailable,
      packageId,
    ]
  );

  return result.rows[0];
};

// Delete Package
const deletePackage = async (packageId) => {
  await pool.query(
    `
    DELETE FROM combo_packages
    WHERE id = $1;
    `,
    [packageId]
  );
};

const getPublicPackages = async () => {
  const result = await pool.query(`
    SELECT
      cp.*,
      r.name AS restaurant_name,
      r.image_url AS restaurant_image,
      cc.name AS category_name
    FROM combo_packages cp
    JOIN restaurants r
      ON cp.restaurant_id = r.id
    JOIN combo_categories cc
      ON cp.category_id = cc.id
    WHERE cp.is_available = true
    ORDER BY cp.created_at DESC;
  `);

  return result.rows;
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  getPackagesByRestaurant,
  updatePackage,
  deletePackage,
  getPublicPackages,
};