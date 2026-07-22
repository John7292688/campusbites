const restaurantService = require("../services/restaurantService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const createRestaurant = asyncHandler(async (req, res) => {
  const { name, description, location, phone, image_url } = req.body;

  if (!name || !location) {
    throw new AppError(
      "Restaurant name and location are required",
      400
    );
  }

  const restaurant = await restaurantService.createRestaurant({
  name,
  description,
  location,
  phone,
  image_url,
  owner_id: req.owner.id,
});

  return res.status(201).json({
    success: true,
    message: "Restaurant created successfully",
    restaurant,
  });
});

const getAllRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await restaurantService.getAllRestaurants();

  return res.status(200).json({
    success: true,
    restaurants,
  });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
};