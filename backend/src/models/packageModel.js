const pool = require("../config/database");

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
    VALUES ($1,$2,$3,$4,$5,$6,$7)
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

const getPackageById = async (packageId) => {
  const result = await pool.query(
    `
    SELECT
      cp.*,
      r.name AS restaurant_name,
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
    ORDER BY cp.created_at DESC;
    `,
    [restaurantId]
  );

  return result.rows;
};

const getAllPackages = async () => {
  const result = await pool.query(
    `
    SELECT
      cp.*,
      r.name AS restaurant_name,
      r.logo,
      cc.name AS category_name
    FROM combo_packages cp
    JOIN restaurants r
      ON cp.restaurant_id = r.id
    JOIN combo_categories cc
      ON cp.category_id = cc.id
    WHERE cp.is_available = TRUE
    ORDER BY cp.created_at DESC;
    `
  );

  return result.rows;
};

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
  getAllPackages,
  getPackageById,
  getPackagesByRestaurant,
  updatePackage,
  deletePackage,
  addMenuItemToPackage,
  removeMenuItemFromPackage,
  getPackageItems,
};