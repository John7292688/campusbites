const bcrypt = require("bcrypt");
const pool = require("../config/database");

const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const {
  registerRestaurantOwnerSchema,
  loginRestaurantOwnerSchema,
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

  const { email, password } = req.body;

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

module.exports = {
  register,
  login,
};