const restaurantService = require("../services/restaurantService");

const createRestaurant = async (req, res) => {
  try {
    const { name, description, location, phone, image_url } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: "Restaurant name and location are required",
      });
    }

    const restaurant = await restaurantService.createRestaurant({
  name,
  description,
  location,
  phone,
  image_url,
});

return res.status(201).json({
  success: true,
  message: "Restaurant created successfully",
  restaurant,
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();

return res.status(200).json({
  success: true,
  restaurants,
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
};