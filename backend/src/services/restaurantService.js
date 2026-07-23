const restaurantModel = require("../models/restaurantModel");

const createRestaurant = (restaurantData) => {
  return restaurantModel.createRestaurant(restaurantData);
};

const getAllRestaurants = () => {
  return restaurantModel.getAllRestaurants();
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
};