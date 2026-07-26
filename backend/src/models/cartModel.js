const pool = require("../config/database");

const addToCart = async (cartData) => {
  const {
  student_id,
  menu_item_id,
  combo_package_id,
  quantity,
} = cartData;

  let result;

if (menu_item_id) {
  result = await pool.query(
    `
    INSERT INTO cart_items (
      student_id,
      menu_item_id,
      quantity
    )
    VALUES ($1, $2, $3)
    ON CONFLICT (student_id, menu_item_id)
    DO UPDATE
    SET quantity = cart_items.quantity + EXCLUDED.quantity
    RETURNING *;
    `,
    [student_id, menu_item_id, quantity]
  );
} else {
  result = await pool.query(
    `
    INSERT INTO cart_items (
      student_id,
      combo_package_id,
      quantity
    )
    VALUES ($1, $2, $3)
    ON CONFLICT (
      student_id,
      combo_package_id
    )
    WHERE combo_package_id IS NOT NULL
    DO UPDATE
    SET quantity = cart_items.quantity + EXCLUDED.quantity
    RETURNING *;
    `,
    [student_id, combo_package_id, quantity]
  );
}

  return result.rows[0];
};

const getCartByStudentId = async (studentId) => {
  const result = await pool.query(
    `
    SELECT
  cart_items.id,
  cart_items.quantity,
  menus.id AS menu_item_id,
  menus.name,
  menus.price,
  menus.unit,
  restaurants.name AS restaurant_name
    FROM cart_items
    JOIN menus
      ON cart_items.menu_item_id = menus.id
    JOIN restaurants
      ON menus.restaurant_id = restaurants.id
    WHERE cart_items.student_id = $1
    ORDER BY cart_items.created_at DESC;
    `,
    [studentId]
  );

  return result.rows;
};

const updateCartItemQuantity = async (cartItemId, studentId, quantity) => {
  const result = await pool.query(
    `
    UPDATE cart_items
    SET quantity = $1
    WHERE id = $2
      AND student_id = $3
    RETURNING *;
    `,
    [quantity, cartItemId, studentId]
  );

  return result.rows[0];
};

const removeCartItem = async (cartItemId, studentId) => {
  const result = await pool.query(
    `
    DELETE FROM cart_items
    WHERE id = $1
      AND student_id = $2
    RETURNING *;
    `,
    [cartItemId, studentId]
  );

  return result.rows[0];
};

const getCartByStudentIdWithClient = async (client, studentId) => {
  const result = await client.query(
    `
    SELECT
      ci.id,
      ci.quantity,
      m.id AS menu_item_id,
      m.name,
      m.price,
      r.name AS restaurant_name
    FROM cart_items ci
    JOIN menus m ON ci.menu_item_id = m.id
    JOIN restaurants r ON m.restaurant_id = r.id
    WHERE ci.student_id = $1;
    `,
    [studentId]
  );

  return result.rows;
};

const clearCartWithClient = async (client, studentId) => {
  await client.query(
    `
    DELETE FROM cart_items
    WHERE student_id = $1;
    `,
    [studentId]
  );
};

module.exports = {
  addToCart,
  getCartByStudentId,
  getCartByStudentIdWithClient,
  updateCartItemQuantity,
  removeCartItem,
  clearCartWithClient,
};