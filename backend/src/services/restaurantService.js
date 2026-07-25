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

const getRestaurantByOwnerId = (ownerId) => {
  return restaurantModel.getRestaurantByOwnerId(ownerId);
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByOwnerId,
};