const restaurantModel = require("../models/restaurantModel");

const createRestaurant = (restaurantData) => {
  return restaurantModel.createRestaurant(restaurantData);
};

const getAllRestaurants = () => {
  return restaurantModel.getAllRestaurants();
};

const getAllRestaurantsForAdmin = () => {
  return restaurantModel.getAllRestaurantsForAdmin();
};

const approveRestaurant = (restaurantId) => {
  return restaurantModel.approveRestaurant(
    restaurantId
  );
};

const rejectRestaurant = (
  restaurantId
) => {
  return restaurantModel.rejectRestaurant(
    restaurantId
  );
};

const suspendRestaurant = (
  restaurantId
) => {
  return restaurantModel.suspendRestaurant(
    restaurantId
  );
};

const reactivateRestaurant = (
  restaurantId
) => {
  return restaurantModel.reactivateRestaurant(
    restaurantId
  );
};

const getRestaurantById = (id) => {
  return restaurantModel.getRestaurantById(id);
};

const getRestaurantByOwnerId = (ownerId) => {
  return restaurantModel.getRestaurantByOwnerId(ownerId);
};

const updateRestaurantByOwnerId = (
  ownerId,
  restaurantData
) => {
  return restaurantModel.updateRestaurantByOwnerId(
    ownerId,
    restaurantData
  );
};

const toggleRestaurantStatus = async (
  ownerId,
  isOpen
) => {
  return await restaurantModel.toggleRestaurantStatus(
    ownerId,
    isOpen
  );
};

const getRestaurantApplicationDetails = (
  restaurantId
) => {
  return restaurantModel.getRestaurantApplicationDetails(
    restaurantId
  );
};

const getTopRestaurants = () => {
  return restaurantModel.getTopRestaurants();
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getAllRestaurantsForAdmin,
  approveRestaurant,
  rejectRestaurant,
  suspendRestaurant,
  reactivateRestaurant,
  getRestaurantById,
  getRestaurantByOwnerId,
  updateRestaurantByOwnerId,
  toggleRestaurantStatus,
  getRestaurantApplicationDetails,
  getTopRestaurants,
};