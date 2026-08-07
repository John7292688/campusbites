const restaurantService = require("../services/restaurantService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const {
  createRestaurantSchema,
} = require("../validators/restaurantValidator");

const createRestaurant = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    location,
    phone,
    image_url,
    logo_url,
  } = req.body;

  const { error } =
    createRestaurantSchema.validate(req.body);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const restaurant =
    await restaurantService.createRestaurant({
      name,
      description,
      location,
      phone,
      image_url,
      logo_url,
      owner_id: req.owner.id,
    });

  return res.status(201).json({
    success: true,
    message: "Restaurant created successfully",
    restaurant,
  });
});

const getAllRestaurants = asyncHandler(async (req, res) => {
  const restaurants =
    await restaurantService.getAllRestaurants();

  return res.status(200).json({
    success: true,
    restaurants,
  });
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const restaurant =
    await restaurantService.getRestaurantById(id);

  if (!restaurant) {
    throw new AppError("Restaurant not found", 404);
  }

  return res.status(200).json({
    success: true,
    restaurant,
  });
});

const getMyRestaurant = asyncHandler(async (req, res) => {
  const restaurant =
    await restaurantService.getRestaurantByOwnerId(
      req.owner.id
    );

  if (!restaurant) {
    throw new AppError("Restaurant not found", 404);
  }

  return res.status(200).json({
    success: true,
    restaurant,
  });
});

const updateMyRestaurant = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    location,
    phone,
    image_url,
    logo_url,
  } = req.body;

  const restaurant =
    await restaurantService.updateRestaurantByOwnerId(
      req.owner.id,
      {
        name,
        description,
        location,
        phone,
        image_url,
        logo_url,
      }
    );

  if (!restaurant) {
    throw new AppError("Restaurant not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Restaurant updated successfully",
    restaurant,
  });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getMyRestaurant,
  updateMyRestaurant,
};