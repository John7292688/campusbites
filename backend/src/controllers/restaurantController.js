const restaurantService = require("../services/restaurantService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { createRestaurantSchema } = require("../validators/restaurantValidator");

const createRestaurant = asyncHandler(async (req, res) => {
  const { name, description, location, phone, image_url } = req.body;

  const { error } = createRestaurantSchema.validate(req.body);

if (error) {
  throw new AppError(error.details[0].message, 400);
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