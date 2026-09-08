const restaurantService = require(
  "../services/restaurantService"
);
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const adminService = require("../services/adminService");

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin =
    await adminService.findAdminByEmail(email);

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  if (admin.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: admin.id,
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return res.status(200).json({
    success: true,
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
  });
});

const getAllRestaurantsForAdmin =
  asyncHandler(async (req, res) => {
    const restaurants =
      await restaurantService.getAllRestaurantsForAdmin();

    return res.status(200).json({
      success: true,
      restaurants,
    });
  });

  const approveRestaurant = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const restaurant =
      await restaurantService.approveRestaurant(
        id
      );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Restaurant approved successfully",
      restaurant,
    });
  }
);

const rejectRestaurant = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const restaurant =
      await restaurantService.rejectRestaurant(
        id
      );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Restaurant rejected successfully",
      restaurant,
    });
  }
);

const suspendRestaurant = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const restaurant =
      await restaurantService.suspendRestaurant(
        id
      );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Restaurant suspended successfully",
      restaurant,
    });
  }
);

const reactivateRestaurant = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const restaurant =
      await restaurantService.reactivateRestaurant(
        id
      );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Restaurant reactivated successfully",
      restaurant,
    });
  }
);

const getRestaurantApplicationDetails =
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const restaurant =
      await restaurantService.getRestaurantApplicationDetails(
        id
      );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      restaurant,
    });
  });

module.exports = {
  adminLogin,
  getAllRestaurantsForAdmin,
  approveRestaurant,
  rejectRestaurant,
  suspendRestaurant,
  reactivateRestaurant,
  getRestaurantApplicationDetails,
};