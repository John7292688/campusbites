const pool = require("../config/database");

const addToCart = async (cartData) => {
  const { student_id, menu_item_id, quantity } = cartData;

  const result = await pool.query(
    `
    INSERT INTO cart_items (student_id, menu_item_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (student_id, menu_item_id)
    DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
    RETURNING *;
    `,
    [student_id, menu_item_id, quantity]
  );

  return result.rows[0];
};

module.exports = {
  addToCart,
};