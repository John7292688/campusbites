const pool = require("../config/database");

const createCustomPlate = async (
  studentId,
  restaurantId,
  totalPrice,
  items
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Create the plate
    const plateResult = await client.query(
      `
      INSERT INTO custom_plates (
        student_id,
        restaurant_id,
        total_price
      )
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [studentId, restaurantId, totalPrice]
    );

    const plate = plateResult.rows[0];

    // Save every selected menu item
    for (const item of items) {
      await client.query(
        `
        INSERT INTO custom_plate_items (
          custom_plate_id,
          menu_item_id,
          quantity,
          price
        )
        VALUES ($1, $2, $3, $4);
        `,
        [
          plate.id,
          item.menuItemId,
          item.quantity,
          item.price,
        ]
      );
    }

    await client.query("COMMIT");

    return plate;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createCustomPlate,
};