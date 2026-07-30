const pool = require("../config/database");

const addToCart = async (cartData) => {
  const {
    student_id,
    menu_item_id,
    combo_package_id,
    custom_plate_id,
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
  } else if (combo_package_id) {
    result = await pool.query(
      `
      INSERT INTO cart_items (
        student_id,
        combo_package_id,
        quantity
      )
      VALUES ($1, $2, $3)
      ON CONFLICT (student_id, combo_package_id)
      WHERE combo_package_id IS NOT NULL
      DO UPDATE
      SET quantity = cart_items.quantity + EXCLUDED.quantity
      RETURNING *;
      `,
      [student_id, combo_package_id, quantity]
    );
  } else if (custom_plate_id) {
    result = await pool.query(
      `
      INSERT INTO cart_items (
        student_id,
        custom_plate_id,
        quantity
      )
      VALUES ($1, $2, $3)
      ON CONFLICT (student_id, custom_plate_id)
      WHERE custom_plate_id IS NOT NULL
      DO UPDATE
      SET quantity = cart_items.quantity + EXCLUDED.quantity
      RETURNING *;
      `,
      [student_id, custom_plate_id, quantity]
    );
  } else {
    throw new Error("No valid item provided.");
  }

  return result.rows[0];
};

const getCartByStudentId = async (studentId) => {
  const result = await pool.query(
    `
    SELECT
      ci.id,
      ci.quantity,

      ci.menu_item_id,
      m.name,
      m.price,
      m.unit,

      ci.combo_package_id,
      cp.name AS combo_name,
      cp.price AS combo_price,
      cp.image AS combo_image,

      ci.custom_plate_id,
      cplt.total_price AS custom_plate_price,

      CASE
        WHEN cplt.id IS NOT NULL
        THEN 'Custom Plate (' || r.name || ')'
        ELSE NULL
      END AS custom_plate_name,

      r.name AS restaurant_name

    FROM cart_items ci

    LEFT JOIN menus m
      ON ci.menu_item_id = m.id

    LEFT JOIN combo_packages cp
      ON ci.combo_package_id = cp.id

    LEFT JOIN custom_plates cplt
      ON ci.custom_plate_id = cplt.id  

    LEFT JOIN restaurants r
      ON r.id = COALESCE(
        m.restaurant_id,
        cp.restaurant_id,
        cplt.restaurant_id
      )

    WHERE ci.student_id = $1

    ORDER BY ci.created_at DESC;
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