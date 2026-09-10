const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const restaurantModel = require("../models/restaurantModel");
const pool = orderModel.getPool();
const notificationService = require(
  "./notificationService"
);

const createOrder = (studentId, totalAmount) => {
  return orderModel.createOrder(studentId, totalAmount);
};

const getOrderById = async (orderId) => {
  return await orderModel.getOrderById(orderId);
};

const getOrderByIdAndStudent = async (
  orderId,
  studentId
) => {
  return await orderModel.getOrderByIdAndStudent(
    orderId,
    studentId
  );
};

const getOrdersByStudentId = async (studentId) => {
  return await orderModel.getOrdersByStudentId(studentId);
};

const updateOrderStatus = async (orderId, status) => {
  return await orderModel.updateOrderStatus(orderId, status);
};

const createOrderItem = async (orderId, menuItemId, quantity, price) => {
  return await orderModel.createOrderItem(
    orderId,
    menuItemId,
    quantity,
    price
  );
};

const getOrderItems = async (orderId) => {
  const items = await orderModel.getOrderItems(orderId);

  for (const item of items) {
    if (item.custom_plate_id) {
      item.custom_plate_items =
        await orderModel.getCustomPlateItems(
          item.custom_plate_id
        );
    }
  }

  return items;
};

const getOrdersByRestaurantId = async (restaurantId) => {
  return await orderModel.getOrdersByRestaurantId(restaurantId);
};

const getRestaurantOwnerByOrderId = async (orderId) => {
  return await orderModel.getRestaurantOwnerByOrderId(orderId);
};

const getCustomersByRestaurantId = async (
  restaurantId
) => {
  return await orderModel.getCustomersByRestaurantId(
    restaurantId
  );
};

const getOrdersForAuthenticatedOwner = async (ownerId) => {

  const restaurant =
    await restaurantModel.getRestaurantByOwnerId(ownerId);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const orders =
    await orderModel.getOrdersByRestaurantId(
      restaurant.id
    );

  return orders.map((order) => ({
    ...order,
    restaurant_name: restaurant.name,
    restaurant_address:
      restaurant.address,
    restaurant_phone:
      restaurant.phone,
  }));
};

const getCustomersForAuthenticatedOwner = async (
  ownerId
) => {
  const restaurant =
    await restaurantModel.getRestaurantByOwnerId(
      ownerId
    );

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return await orderModel.getCustomersByRestaurantId(
    restaurant.id
  );
};

const getLatestDeliveryInfoByStudentId =
  async (studentId) => {
    return await orderModel.getLatestDeliveryInfoByStudentId(
      studentId
    );
  };

const checkout = async (
  studentId,
  deliveryLocationId,
  deliveryAddress,
  addressNote
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const cartItems = await cartModel.getCartByStudentIdWithClient(
      client,
      studentId
    );

if (cartItems.length === 0) {
  throw new Error("Cart is empty");
}

const firstItem = cartItems[0];

let restaurantId = null;

if (firstItem.menu_item_id) {
  const result = await pool.query(
    `
    SELECT restaurant_id
    FROM menus
    WHERE id = $1;
    `,
    [firstItem.menu_item_id]
  );

  restaurantId =
    result.rows[0]?.restaurant_id;
}

if (firstItem.combo_package_id) {
  const result = await pool.query(
    `
    SELECT restaurant_id
    FROM combo_packages
    WHERE id = $1;
    `,
    [firstItem.combo_package_id]
  );

  restaurantId =
    result.rows[0]?.restaurant_id;
}

if (firstItem.custom_plate_id) {
  const result = await pool.query(
    `
    SELECT restaurant_id
    FROM custom_plates
    WHERE id = $1;
    `,
    [firstItem.custom_plate_id]
  );

  restaurantId =
    result.rows[0]?.restaurant_id;
}

if (restaurantId) {
  const restaurant =
    await restaurantModel.getRestaurantById(
      restaurantId
    );

  if (!restaurant.is_open) {
    throw new Error(
      "This restaurant is currently closed and not accepting orders."
    );
  }
}

const cartTotal = cartItems.reduce((total, item) => {
  return total + Number(item.price) * item.quantity;
}, 0);

const locationResult = await pool.query(
  `
  SELECT delivery_fee
  FROM delivery_locations
  WHERE id = $1
  `,
  [deliveryLocationId]
);

if (locationResult.rows.length === 0) {
  throw new Error("Invalid delivery location");
}

const deliveryFee =
  Number(locationResult.rows[0].delivery_fee);

const totalAmount =
  cartTotal + Number(deliveryFee || 0);

console.log("CART TOTAL:", cartTotal);
console.log("DELIVERY FEE:", deliveryFee);
console.log("FINAL TOTAL:", totalAmount);  

const order = await orderModel.createOrderWithClient(
  client,
  studentId,
  totalAmount,
  deliveryLocationId,
  deliveryFee,
  deliveryAddress,
  addressNote
);

for (const item of cartItems) {
  console.log("CHECKOUT ITEM:");
  console.log(item);

  await orderModel.createOrderItemWithClient(
    client,
    order.id,
    {
      menuItemId: item.menu_item_id,
      comboPackageId: item.combo_package_id,
      customPlateId: item.custom_plate_id,
      quantity: item.quantity,
      price: item.price,
    }
  );
}

await cartModel.clearCartWithClient(client, studentId);

await client.query("COMMIT");

/*
  Create notification for restaurant owner
*/


if (firstItem.menu_item_id) {
  const result = await pool.query(
    `
    SELECT restaurant_id
    FROM menus
    WHERE id = $1;
    `,
    [firstItem.menu_item_id]
  );

  restaurantId = result.rows[0]?.restaurant_id;
}

if (firstItem.combo_package_id) {
  const result = await pool.query(
    `
    SELECT restaurant_id
    FROM combo_packages
    WHERE id = $1;
    `,
    [firstItem.combo_package_id]
  );

  restaurantId = result.rows[0]?.restaurant_id;
}

if (firstItem.custom_plate_id) {
  const result = await pool.query(
    `
    SELECT restaurant_id
    FROM custom_plates
    WHERE id = $1;
    `,
    [firstItem.custom_plate_id]
  );

  restaurantId = result.rows[0]?.restaurant_id;
}

if (restaurantId) {
  const restaurant =
    await restaurantModel.getRestaurantById(
      restaurantId
    );

  // await notificationService.createNotification(
  //   restaurant.owner_id,
  //   "New Order",
  //   `Order #${order.id} has been placed.`
  // );
}

return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getOrderByIdAndStudent,
  getOrdersByStudentId,
  updateOrderStatus,
  createOrderItem,
  getOrderItems,
  getOrdersByRestaurantId,
  getRestaurantOwnerByOrderId,
  getCustomersByRestaurantId,
  getOrdersForAuthenticatedOwner,
  getCustomersForAuthenticatedOwner,
  getLatestDeliveryInfoByStudentId,
  checkout,
};