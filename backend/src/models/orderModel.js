const pool = require("../config/database");

const createOrder = async (studentId, totalAmount) => {
  const result = await pool.query(
    `
    INSERT INTO orders (student_id, total_amount)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [studentId, totalAmount]
  );

  return result.rows[0];
};

const createOrderWithClient = async (client, studentId, totalAmount) => {
  const result = await client.query(
    `
    INSERT INTO orders (student_id, total_amount)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [studentId, totalAmount]
  );

  return result.rows[0];
};

const createOrderItemWithClient = async (
  client,
  orderId,
  menuItemId,
  quantity,
  price
) => {
  const result = await client.query(
    `
    INSERT INTO order_items (order_id, menu_item_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [orderId, menuItemId, quantity, price]
  );

  return result.rows[0];
};

const getOrderById = async (orderId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM orders
    WHERE id = $1;
    `,
    [orderId]
  );

  return result.rows[0];
};

const updateOrderStatus = async (orderId, status) => {
  const result = await pool.query(
    `
    UPDATE orders
    SET status = $1
    WHERE id = $2
    RETURNING *;
    `,
    [status, orderId]
  );

  return result.rows[0];
};

const createOrderItem = async (orderId, menuItemId, quantity, price) => {
  const result = await pool.query(
    `
    INSERT INTO order_items (order_id, menu_item_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [orderId, menuItemId, quantity, price]
  );

  return result.rows[0];
};

const getOrderItems = async (orderId) => {
  const result = await pool.query(
    `
    SELECT
      oi.id,
      oi.quantity,
      oi.price,
      m.name AS menu_item_name,
      r.name AS restaurant_name
    FROM order_items oi
    JOIN menus m ON oi.menu_item_id = m.id
    JOIN restaurants r ON m.restaurant_id = r.id
    WHERE oi.order_id = $1;
    `,
    [orderId]
  );

  return result.rows;
};

const getPool = () => {
  return pool;
};

module.exports = {
  createOrder,
  createOrderWithClient,
  getOrderById,
  updateOrderStatus,
  createOrderItem,
  createOrderItemWithClient,
  getOrderItems,
  getPool,
};