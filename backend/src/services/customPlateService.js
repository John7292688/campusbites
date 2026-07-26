const customPlateModel = require("../models/customPlateModel");

const createCustomPlate = async (
  studentId,
  restaurantId,
  totalPrice,
  items
) => {
  return customPlateModel.createCustomPlate(
    studentId,
    restaurantId,
    totalPrice,
    items
  );
};

module.exports = {
  createCustomPlate,
};