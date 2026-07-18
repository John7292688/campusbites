const restaurantModel = require("../models/restaurantModel");

const createRestaurant = async (restaurantData) => {
  return await restaurantModel.createRestaurant(restaurantData);
};

const getAllRestaurants = async () => {
  return await restaurantModel.getAllRestaurants();
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
};