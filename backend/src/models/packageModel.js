const pool = require("../config/database");

const createPackage = async ({
  restaurantId,
  name,
  description,
  price,
  imageUrl,
}) => {
  const result = await pool.query(
    `
    INSERT INTO packages (
      restaurant_id,
      name,
      description,
      price,
      image_url
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    [restaurantId, name, description, price, imageUrl]
  );

  return result.rows[0];
};

const getPackageById = async (packageId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM packages
    WHERE id = $1;
    `,
    [packageId]
  );

  return result.rows[0];
};

const getPackagesByRestaurant = async (restaurantId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM packages
    WHERE restaurant_id = $1
    ORDER BY created_at DESC;
    `,
    [restaurantId]
  );

  return result.rows;
};

const updatePackage = async (
  packageId,
  { name, description, price, imageUrl, isAvailable }
) => {
  const result = await pool.query(
    `
    UPDATE packages
    SET
      name = $1,
      description = $2,
      price = $3,
      image_url = $4,
      is_available = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *;
    `,
    [
      name,
      description,
      price,
      imageUrl,
      isAvailable,
      packageId,
    ]
  );

  return result.rows[0];
};

const deletePackage = async (packageId) => {
  await pool.query(
    `
    DELETE FROM packages
    WHERE id = $1;
    `,
    [packageId]
  );
};

const addMenuItemToPackage = async (
  packageId,
  menuId,
  quantity
) => {
  const result = await pool.query(
    `
    INSERT INTO package_items (
      package_id,
      menu_id,
      quantity
    )
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [packageId, menuId, quantity]
  );

  return result.rows[0];
};

const removeMenuItemFromPackage = async (
  packageId,
  menuId
) => {
  await pool.query(
    `
    DELETE FROM package_items
    WHERE package_id = $1
      AND menu_id = $2;
    `,
    [packageId, menuId]
  );
};

const getPackageItems = async (packageId) => {
  const result = await pool.query(
    `
    SELECT
      pi.id,
      pi.quantity,
      m.id AS menu_id,
      m.name,
      m.description,
      m.price,
      m.image_url
    FROM package_items pi
    JOIN menus m
      ON pi.menu_id = m.id
    WHERE pi.package_id = $1
    ORDER BY m.name;
    `,
    [packageId]
  );

  return result.rows;
};

module.exports = {
  createPackage,
  getPackageById,
  getPackagesByRestaurant,
  updatePackage,
  deletePackage,
  addMenuItemToPackage,
  removeMenuItemFromPackage,
  getPackageItems,
};