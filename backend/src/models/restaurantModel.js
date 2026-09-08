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
      owner_id,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
      "pending",
    ]
  );

  return result.rows[0];
};

const getAllRestaurants = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM restaurants
    WHERE status = 'approved'
    ORDER BY created_at DESC;
    `
  );

  return result.rows;
};

const getAllRestaurantsForAdmin = async () => {
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

const toggleRestaurantStatus = async (
  ownerId,
  isOpen
) => {
  const result = await pool.query(
    `
    UPDATE restaurants
    SET is_open = $1
    WHERE owner_id = $2
    RETURNING *;
    `,
    [isOpen, ownerId]
  );

  return result.rows[0];
};

const approveRestaurant = async (restaurantId) => {
  const result = await pool.query(
    `
    UPDATE restaurants
    SET
      status = 'approved',
      is_approved = true
    WHERE id = $1
    RETURNING *;
    `,
    [restaurantId]
  );

  return result.rows[0];
};

const rejectRestaurant = async (restaurantId) => {
  const result = await pool.query(
    `
    UPDATE restaurants
    SET
      status = 'rejected',
      is_approved = false
    WHERE id = $1
    RETURNING *;
    `,
    [restaurantId]
  );

  return result.rows[0];
};

const suspendRestaurant = async (
  restaurantId
) => {
  const result = await pool.query(
    `
    UPDATE restaurants
    SET status = 'suspended'
    WHERE id = $1
    RETURNING *;
    `,
    [restaurantId]
  );

  return result.rows[0];
};

const reactivateRestaurant = async (
  restaurantId
) => {
  const result = await pool.query(
    `
    UPDATE restaurants
    SET status = 'approved'
    WHERE id = $1
    RETURNING *;
    `,
    [restaurantId]
  );

  return result.rows[0];
};

const getRestaurantApplicationDetails = async (
  restaurantId
) => {
  const restaurantResult =
    await pool.query(
      `
      SELECT
        r.*,
        u.id AS owner_id,
        u.full_name AS owner_name,
        u.email AS owner_email,
        u.phone AS owner_phone
      FROM restaurants r
      LEFT JOIN restaurant_owners u
        ON r.owner_id = u.id
      WHERE r.id = $1;
      `,
      [restaurantId]
    );

  const menuResult =
  await pool.query(
    `
    SELECT *
    FROM menus
    WHERE restaurant_id = $1
    ORDER BY created_at DESC;
    `,
    [restaurantId]
  );

  const comboPackageResult =
  await pool.query(
    `
    SELECT *
    FROM combo_packages
    WHERE restaurant_id = $1
    ORDER BY created_at DESC;
    `,
    [restaurantId]
  );

return {
  ...restaurantResult.rows[0],
  menuItems: menuResult.rows,
  comboPackages:
    comboPackageResult.rows,
};
};

const getFeaturedRestaurants = async () => {
  const result = await pool.query(`
    SELECT
      r.*,
      COUNT(DISTINCT o.id) AS total_orders

    FROM restaurants r

    JOIN order_items oi
      ON TRUE

    LEFT JOIN menus m
      ON oi.menu_item_id = m.id

    LEFT JOIN combo_packages cp
      ON oi.combo_package_id = cp.id

    LEFT JOIN custom_plates cplt
      ON oi.custom_plate_id = cplt.id

    JOIN orders o
      ON oi.order_id = o.id

    WHERE r.id = COALESCE(
      m.restaurant_id,
      cp.restaurant_id,
      cplt.restaurant_id
    )

    AND r.status = 'approved'

    GROUP BY r.id

    ORDER BY total_orders DESC

    LIMIT 3;
  `);

  return result.rows;
};

const getTopRestaurants = async () => {
  const result = await pool.query(`
    SELECT
      r.*,
      COUNT(DISTINCT o.id) AS total_orders

    FROM restaurants r

    JOIN menus m
      ON r.id = m.restaurant_id

    JOIN order_items oi
      ON m.id = oi.menu_item_id

    JOIN orders o
      ON oi.order_id = o.id

    WHERE r.status = 'approved'

    GROUP BY r.id

    ORDER BY total_orders DESC

    LIMIT 3;
  `);

  return result.rows;
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getAllRestaurantsForAdmin,
  getRestaurantById,
  getRestaurantByOwnerId,
  updateRestaurantByOwnerId,
  toggleRestaurantStatus,
  approveRestaurant,
  rejectRestaurant,
  suspendRestaurant,
  reactivateRestaurant,
  getRestaurantApplicationDetails,
  getFeaturedRestaurants,
  getTopRestaurants,
};