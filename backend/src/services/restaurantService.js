const restaurantModel = require("../models/restaurantModel");

const createRestaurant = (restaurantData) => {
  return restaurantModel.createRestaurant(restaurantData);
};

const getAllRestaurants = () => {
  return restaurantModel.getAllRestaurants();
};

const getRestaurantById = (id) => {
  return restaurantModel.getRestaurantById(id);
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
};