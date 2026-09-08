const bcrypt = require("bcrypt");
const pool = require("../config/database");

const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const restaurantModel = require(
  "../models/restaurantModel"
);
const {
  registerRestaurantOwnerSchema,
  loginRestaurantOwnerSchema,
  ownerForgotPasswordSchema,
  ownerVerifyOtpSchema,
  ownerResetPasswordSchema,
} = require("../validators/restaurantOwnerValidator");

const register = asyncHandler(async (req, res) => {
  const { error } = registerRestaurantOwnerSchema.validate(req.body);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const { full_name, phone, email, password } = req.body;

  // Check if the email already exists
  const existingOwner = await pool.query(
    "SELECT * FROM restaurant_owners WHERE email = $1",
    [email]
  );

  if (existingOwner.rows.length > 0) {
    throw new AppError("Email already registered", 409);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save restaurant owner
  await pool.query(
    `INSERT INTO restaurant_owners
    (full_name, phone, email, password)
    VALUES ($1, $2, $3, $4)`,
    [full_name, phone, email, hashedPassword]
  );

  res.status(201).json({
    success: true,
    message: "Restaurant owner registered successfully",
  });
});

const login = asyncHandler(async (req, res) => {
  const { error } = loginRestaurantOwnerSchema.validate(req.body);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const { email, password, fcmToken } = req.body;

  const result = await pool.query(
    "SELECT * FROM restaurant_owners WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new AppError("Restaurant owner not found", 404);
  }

  const owner = result.rows[0];

  const isPasswordCorrect = await bcrypt.compare(
    password,
    owner.password
  );

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }
  if (fcmToken) {
    await pool.query(
      `
        UPDATE restaurant_owners
        SET fcm_token = $1
        WHERE id = $2
      `,
      [fcmToken, owner.id]
    );
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    token: generateToken(owner.id, "restaurant_owner"),
    owner: {
      id: owner.id,
      full_name: owner.full_name,
      phone: owner.phone,
      email: owner.email,
    },
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const result = await pool.query(
    `SELECT * FROM restaurant_owners
     WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    throw new AppError(
      "Restaurant owner not found",
      404
    );
  }

  await pool.query(
    `DELETE FROM owner_password_reset_otps
     WHERE email = $1`,
    [email]
  );

  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const expiresAt = new Date(
    Date.now() + 10 * 60 * 1000
  );

  await pool.query(
    `INSERT INTO owner_password_reset_otps
     (email, otp, expires_at)
     VALUES ($1, $2, $3)`,
    [email, otp, expiresAt]
  );

  await sendEmail(
    email,
    "CampusBites Owner Password Reset OTP",
    `
      <h2>Password Reset Request</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
    `
  );

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { error } =
    ownerVerifyOtpSchema.validate(
      req.body
    );

  if (error) {
    throw new AppError(
      error.details[0].message,
      400
    );
  }

  const { email, otp } = req.body;

  const result = await pool.query(
    `SELECT *
     FROM owner_password_reset_otps
     WHERE email = $1
     AND otp = $2`,
    [email, otp]
  );

  if (result.rows.length === 0) {
    throw new AppError(
      "Invalid OTP",
      400
    );
  }

  const otpRecord =
    result.rows[0];

  if (
    new Date() >
    new Date(
      otpRecord.expires_at
    )
  ) {
    throw new AppError(
      "OTP has expired",
      400
    );
  }

  res.status(200).json({
    success: true,
    message:
      "OTP verified successfully",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { error } =
    ownerResetPasswordSchema.validate(
      req.body
    );

  if (error) {
    throw new AppError(
      error.details[0].message,
      400
    );
  }

  const {
    email,
    otp,
    password,
  } = req.body;

  const otpResult =
    await pool.query(
      `SELECT *
       FROM owner_password_reset_otps
       WHERE email = $1
       AND otp = $2`,
      [email, otp]
    );

  if (
    otpResult.rows.length === 0
  ) {
    throw new AppError(
      "Invalid OTP",
      400
    );
  }

  const otpRecord =
    otpResult.rows[0];

  if (
    new Date() >
    new Date(
      otpRecord.expires_at
    )
  ) {
    throw new AppError(
      "OTP has expired",
      400
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  await pool.query(
    `UPDATE restaurant_owners
     SET password = $1
     WHERE email = $2`,
    [hashedPassword, email]
  );

  await pool.query(
    `DELETE FROM owner_password_reset_otps
     WHERE email = $1`,
    [email]
  );

  res.status(200).json({
    success: true,
    message:
      "Password reset successfully",
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const result = await pool.query(
    `
    SELECT
      id,
      full_name,
      email,
      phone,
      created_at
    FROM restaurant_owners
    WHERE id = $1
    `,
    [req.owner.id]
  );

  if (result.rows.length === 0) {
    throw new AppError(
      "Restaurant owner not found",
      404
    );
  }

  const restaurant =
  await restaurantModel.getRestaurantByOwnerId(
    req.owner.id
  );

  res.status(200).json({
    success: true,
    owner: result.rows[0],
    restaurant,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { full_name, email, phone } = req.body;

  const result = await pool.query(
    `
    UPDATE restaurant_owners
    SET
      full_name = $1,
      email = $2,
      phone = $3
    WHERE id = $4
    RETURNING
      id,
      full_name,
      email,
      phone,
      created_at
    `,
    [
      full_name,
      email,
      phone,
      req.owner.id,
    ]
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    owner: result.rows[0],
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const {
    currentPassword,
    newPassword,
  } = req.body;

  const result = await pool.query(
    `
    SELECT *
    FROM restaurant_owners
    WHERE id = $1
    `,
    [req.owner.id]
  );

  const owner = result.rows[0];

  if (!owner) {
    throw new AppError(
      "Restaurant owner not found",
      404
    );
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      currentPassword,
      owner.password
    );

  if (!isPasswordCorrect) {
    throw new AppError(
      "Current password is incorrect",
      400
    );
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
    UPDATE restaurant_owners
    SET password = $1
    WHERE id = $2
    `,
    [hashedPassword, req.owner.id]
  );

  res.status(200).json({
    success: true,
    message:
      "Password updated successfully",
  });
});

module.exports = {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
};