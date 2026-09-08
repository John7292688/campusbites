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

const createOrderWithClient = async (
    client,
    studentId,
    totalAmount,
    deliveryLocationId,
    deliveryFee,
    deliveryAddress,
    addressNote
) => {
  const result = await client.query(
    `
    INSERT INTO orders (
      student_id,
      total_amount,
      delivery_location_id,
      delivery_fee,
      delivery_address,
      address_note
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
    [
      studentId,
      totalAmount,
      deliveryLocationId,
      deliveryFee,
      deliveryAddress,
      addressNote,
    ]
  );

  const order = result.rows[0];

  const receiptNumber =
    `CB-${order.id}-${Date.now()}`;

  await client.query(
    `
    UPDATE orders
    SET receipt_number = $1
    WHERE id = $2;
    `,
    [receiptNumber, order.id]
  );

  order.receipt_number = receiptNumber;

  return order;
};

const createOrderItemWithClient = async (
  client,
  orderId,
  {
    menuItemId = null,
    comboPackageId = null,
    customPlateId = null,
    quantity,
    price,
  }
) => {
  const result = await client.query(
    `
    INSERT INTO order_items (
      order_id,
      menu_item_id,
      combo_package_id,
      custom_plate_id,
      quantity,
      price
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
    [
      orderId,
      menuItemId,
      comboPackageId,
      customPlateId,
      quantity,
      price,
    ]
  );

  return result.rows[0];
};

const getOrderById = async (orderId) => {
  const result = await pool.query(
    `
    SELECT
      o.*,
      p.payment_status,

      r.name AS restaurant_name,

      ro.email AS owner_email,
      ro.full_name AS owner_name,
      ro.fcm_token AS owner_fcm_token,

      s.full_name AS student_name,
      s.phone AS student_phone,
      s.email AS student_email,

      json_agg(
        json_build_object(
          'quantity', oi.quantity,

          'item_name',
          COALESCE(
            m.name,
            cp.name,
            'Custom Plate'
          ),

          'price', oi.price
        )
      ) AS items

    FROM orders o
    LEFT JOIN payments p
    ON p.order_id = o.id

    JOIN students s
      ON s.id = o.student_id

    JOIN order_items oi
      ON oi.order_id = o.id

    LEFT JOIN menus m
      ON oi.menu_item_id = m.id

    LEFT JOIN combo_packages cp
      ON oi.combo_package_id = cp.id

    LEFT JOIN custom_plates cplt
      ON oi.custom_plate_id = cplt.id

    JOIN restaurants r
      ON r.id = COALESCE(
        m.restaurant_id,
        cp.restaurant_id,
        cplt.restaurant_id
      )

    JOIN restaurant_owners ro
      ON ro.id = r.owner_id

    WHERE o.id = $1

    GROUP BY
      o.id,
      p.payment_status,
      r.name,
      ro.email,
      ro.full_name,
      ro.fcm_token,
      s.full_name,
      s.phone,
      s.email;
    `,
    [orderId]
  );

  return result.rows[0];
};

const getOrderByIdAndStudent = async (orderId, studentId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM orders
    WHERE id = $1
      AND student_id = $2;
    `,
    [orderId, studentId]
  );

  return result.rows[0];
};

const getOrdersByStudentId = async (studentId) => {
  const result = await pool.query(
    `
    SELECT DISTINCT
      o.id,
      o.total_amount,
      o.status,
      o.created_at,

      r.name AS restaurant_name,
      r.image_url AS restaurant_image

    FROM orders o

    JOIN order_items oi
      ON o.id = oi.order_id

    LEFT JOIN menus m
      ON oi.menu_item_id = m.id

    LEFT JOIN combo_packages cp
      ON oi.combo_package_id = cp.id

    LEFT JOIN custom_plates cplt
      ON oi.custom_plate_id = cplt.id

    JOIN restaurants r
      ON r.id = COALESCE(
        m.restaurant_id,
        cp.restaurant_id,
        cplt.restaurant_id
      )

    WHERE o.student_id = $1

    ORDER BY o.created_at DESC;
    `,
    [studentId]
  );

  return result.rows;
};

const getLatestDeliveryInfoByStudentId = async (
  studentId
) => {
  const result = await pool.query(
    `
    SELECT
      delivery_address,
      address_note
    FROM orders
    WHERE student_id = $1
      AND delivery_address IS NOT NULL
    ORDER BY created_at DESC
    LIMIT 1;
    `,
    [studentId]
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

      oi.menu_item_id,
      m.name AS menu_item_name,

      oi.combo_package_id,
      cp.name AS combo_package_name,

      oi.custom_plate_id,

      CASE
        WHEN cplt.id IS NOT NULL
        THEN 'Custom Plate (' || r.name || ')'
        ELSE NULL
      END AS custom_plate_name,

      r.name AS restaurant_name,
      o.status

    FROM order_items oi

    JOIN orders o
      ON oi.order_id = o.id

    LEFT JOIN menus m
      ON oi.menu_item_id = m.id

    LEFT JOIN combo_packages cp
      ON oi.combo_package_id = cp.id

    LEFT JOIN custom_plates cplt
      ON oi.custom_plate_id = cplt.id

    LEFT JOIN restaurants r
      ON r.id = COALESCE(
        m.restaurant_id,
        cp.restaurant_id,
        cplt.restaurant_id
      )

    WHERE oi.order_id = $1;
    `,
    [orderId]
  );

  return result.rows;
};

const getCustomPlateItems = async (customPlateId) => {
  const result = await pool.query(
    `
    SELECT
      m.name,
      cpi.quantity
    FROM custom_plate_items cpi
    JOIN menus m
      ON cpi.menu_item_id = m.id
    WHERE cpi.custom_plate_id = $1
    ORDER BY m.name;
    `,
    [customPlateId]
  );

  return result.rows;
};

const getRestaurantIdByOrderId = async (orderId) => {
  const result = await pool.query(
    `
    SELECT DISTINCT
      m.restaurant_id
    FROM order_items oi
    JOIN menus m
      ON oi.menu_item_id = m.id
    WHERE oi.order_id = $1;
    `,
    [orderId]
  );

  return result.rows[0];
};

const getOrdersByRestaurantId = async (restaurantId) => {
  const result = await pool.query(
    `
    SELECT DISTINCT
      o.id,
      o.receipt_number,
      o.student_id,
      s.full_name,
      s.phone,
      s.email,
      o.total_amount,
      o.status,
      o.created_at,
      o.delivery_address,
      o.address_note

    FROM orders o

    JOIN students s
      ON o.student_id = s.id

    JOIN order_items oi
      ON o.id = oi.order_id

    LEFT JOIN menus m
      ON oi.menu_item_id = m.id

    LEFT JOIN combo_packages cp
      ON oi.combo_package_id = cp.id

    LEFT JOIN custom_plates cplt
      ON oi.custom_plate_id = cplt.id

    WHERE
      m.restaurant_id = $1
      OR cp.restaurant_id = $1
      OR cplt.restaurant_id = $1

    ORDER BY o.created_at DESC;
    `,
    [restaurantId]
  );
  console.log("RECEIPT TEST");
  console.log(result.rows[0]);

  return result.rows;
};

const getRestaurantOwnerByOrderId = async (orderId) => {
  const result = await pool.query(
    `
    SELECT DISTINCT
      r.owner_id

    FROM orders o
    JOIN order_items oi
      ON o.id = oi.order_id

    LEFT JOIN menus m
      ON oi.menu_item_id = m.id

    LEFT JOIN combo_packages cp
      ON oi.combo_package_id = cp.id

    LEFT JOIN custom_plates cplt
      ON oi.custom_plate_id = cplt.id

    LEFT JOIN restaurants r
      ON r.id = COALESCE(
        m.restaurant_id,
        cp.restaurant_id,
        cplt.restaurant_id
      )

    WHERE o.id = $1;
    `,
    [orderId]
  );

  return result.rows[0];
};

const getCustomersByRestaurantId = async (
  restaurantId
) => {
  const result = await pool.query(
    `
    SELECT
      s.id,
      s.full_name,
      s.phone,

      COUNT(DISTINCT o.id) AS total_orders,

      COALESCE(
        SUM(o.total_amount),
        0
      ) AS total_spent,

      MAX(o.created_at) AS last_order_date

    FROM students s

    JOIN orders o
      ON s.id = o.student_id

    JOIN order_items oi
      ON o.id = oi.order_id

    LEFT JOIN menus m
      ON oi.menu_item_id = m.id

    LEFT JOIN combo_packages cp
      ON oi.combo_package_id = cp.id

    LEFT JOIN custom_plates cplt
      ON oi.custom_plate_id = cplt.id

    WHERE
      m.restaurant_id = $1
      OR cp.restaurant_id = $1
      OR cplt.restaurant_id = $1

    GROUP BY
      s.id,
      s.full_name,
      s.phone

    ORDER BY
      total_spent DESC;
    `,
    [restaurantId]
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
  getOrderByIdAndStudent,
  getOrdersByStudentId,
  getLatestDeliveryInfoByStudentId,
  updateOrderStatus,
  createOrderItem,
  createOrderItemWithClient,
  getOrderItems,
  getCustomPlateItems,
  getOrdersByRestaurantId,
  getRestaurantIdByOrderId,
  getRestaurantOwnerByOrderId,
  getCustomersByRestaurantId,
  getPool,
};