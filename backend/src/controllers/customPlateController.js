const pool = require("../config/database");
const customPlateService = require("../services/customPlateService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const createCustomPlate = asyncHandler(async (req, res) => {
  const studentId = req.student.id;

  const { restaurantId, items } = req.body;

  if (!restaurantId || !items || items.length === 0) {
    throw new AppError(
      "Restaurant and menu items are required.",
      400
    );
  }

  let totalPrice = 0;

  const itemsWithPrices = [];

  for (const item of items) {
    const result = await pool.query(
      `
      SELECT id, price
      FROM menus
      WHERE id = $1;
      `,
      [item.menuItemId]
    );

    if (result.rows.length === 0) {
      throw new AppError(
        `Menu item ${item.menuItemId} not found.`,
        404
      );
    }

    const menuItem = result.rows[0];

    totalPrice +=
      Number(menuItem.price) * item.quantity;

    itemsWithPrices.push({
      menuItemId: menuItem.id,
      quantity: item.quantity,
      price: menuItem.price,
    });
  }

  const customPlate =
    await customPlateService.createCustomPlate(
      studentId,
      restaurantId,
      totalPrice,
      itemsWithPrices
    );

  res.status(201).json({
    success: true,
    message:
      "Custom plate created successfully.",
    customPlate,
  });
});

module.exports = {
  createCustomPlate,
};