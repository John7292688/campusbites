const express = require("express");

const router = express.Router();

const restaurantOwnerAuthMiddleware = require(
  "../middleware/restaurantOwnerAuthMiddleware"
);

const {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
} = require(
  "../controllers/restaurantOwnerAuthController"
);

router.post("/register", register);

router.post("/login", login);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/verify-otp",
  verifyOtp
);

router.post(
  "/reset-password",
  resetPassword
);

router.get(
  "/profile",
  restaurantOwnerAuthMiddleware,
  getProfile
);

router.put(
  "/profile",
  restaurantOwnerAuthMiddleware,
  updateProfile
);

router.put(
  "/change-password",
  restaurantOwnerAuthMiddleware,
  changePassword
);

module.exports = router;