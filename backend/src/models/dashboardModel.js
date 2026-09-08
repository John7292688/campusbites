const pool = require("../config/database");

const getDashboardSummary = async (ownerId) => {
  const result = await pool.query(
    `
    SELECT
      COALESCE(COUNT(DISTINCT o.id) FILTER (
        WHERE DATE(o.created_at) = CURRENT_DATE
      ), 0) AS today_orders,

      COALESCE(SUM(DISTINCT o.total_amount) FILTER (
        WHERE DATE(o.created_at) = CURRENT_DATE
      ), 0) AS today_revenue,

      COALESCE(COUNT(DISTINCT o.id) FILTER (
        WHERE o.status = 'Pending'
      ), 0) AS pending_orders,

      COALESCE(COUNT(DISTINCT o.id) FILTER (
        WHERE o.status = 'Preparing'
      ), 0) AS preparing_orders,

      COALESCE(COUNT(DISTINCT o.id) FILTER (
        WHERE o.status = 'Delivered'
      ), 0) AS delivered_orders

    FROM restaurants r

    LEFT JOIN orders o
      ON o.id IN (

        SELECT oi.order_id
        FROM order_items oi

        LEFT JOIN menus m
          ON oi.menu_item_id = m.id

        LEFT JOIN combo_packages cp
          ON oi.combo_package_id = cp.id

        LEFT JOIN custom_plates cplt
          ON oi.custom_plate_id = cplt.id

        WHERE COALESCE(
          m.restaurant_id,
          cp.restaurant_id,
          cplt.restaurant_id
        ) = r.id
      )

    WHERE r.owner_id = $1;
    `,
    [ownerId]
  );

  return result.rows[0];
};

const getRecentOrders = async (ownerId) => {
  const result = await pool.query(
    `
    SELECT DISTINCT
      o.id,
      o.receipt_number,
      o.total_amount,
      o.status,
      o.created_at,

      s.full_name,
      s.phone,

      o.delivery_address,
      o.address_note,

      r.name AS restaurant_name,
      r.location AS restaurant_address

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
      ON o.id = oi.order_id

    JOIN students s
      ON s.id = o.student_id

    WHERE r.owner_id = $1
      AND COALESCE(
        m.restaurant_id,
        cp.restaurant_id,
        cplt.restaurant_id
      ) = r.id

    ORDER BY o.created_at DESC

    LIMIT 5;
    `,
    [ownerId]
  );

  return result.rows;
};

const getTopSellingMenuItem = async (ownerId) => {
  const result = await pool.query(
    `
    SELECT
      cp.name,
      SUM(oi.quantity) AS total_sold

    FROM order_items oi

    JOIN combo_packages cp
      ON oi.combo_package_id = cp.id

    JOIN restaurants r
      ON cp.restaurant_id = r.id

    WHERE r.owner_id = $1

    GROUP BY cp.id, cp.name

    ORDER BY total_sold DESC

    LIMIT 1;
    `,
    [ownerId]
  );

  return result.rows[0] || null;
};

module.exports = {
  getDashboardSummary,
  getRecentOrders,
  getTopSellingMenuItem,
};