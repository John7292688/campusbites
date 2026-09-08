const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

const validate = require("../middleware/validate");
const authMiddleware = require("../middleware/authMiddleware");
const {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} = require("../validators/authValidator");

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/verify-otp",
  validate(verifyOtpSchema),
  verifyOtp
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

module.exports = router;