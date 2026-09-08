const bcrypt = require("bcrypt");
const pool = require("../config/database");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const register = asyncHandler(async (req, res) => {
  const { full_name, phone, email, password } = req.body;

  const existingUser = await pool.query(
    "SELECT * FROM students WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO students (full_name, phone, email, password)
     VALUES ($1, $2, $3, $4)`,
    [full_name, phone, email, hashedPassword]
  );

  res.status(201).json({
    success: true,
    message: "Student registered successfully",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM students WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new AppError("Student not found", 404);
  }

  const student = result.rows[0];

  const isPasswordCorrect = await bcrypt.compare(
    password,
    student.password
  );

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    token: generateToken(student.id, "student"),
    student: {
      id: student.id,
      full_name: student.full_name,
      phone: student.phone,
      email: student.email,
    },
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const userResult = await pool.query(
    "SELECT * FROM students WHERE email = $1",
    [email]
  );

  if (userResult.rows.length === 0) {
    throw new AppError("No account found with this email", 404);
  }

  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const expiresAt = new Date(
    Date.now() + 10 * 60 * 1000
  );

  await pool.query(
    `DELETE FROM password_reset_otps
    WHERE email = $1`,
    [email]
  );
  await pool.query(
    `INSERT INTO password_reset_otps
    (email, otp, expires_at)
    VALUES ($1, $2, $3)`,
    [email, otp, expiresAt]
  );

  await sendEmail(
    email,
    "CampusBites Password Reset OTP",
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
  const { email, otp } = req.body;

  const result = await pool.query(
    `SELECT * FROM password_reset_otps
     WHERE email = $1
     AND otp = $2
     ORDER BY created_at DESC
     LIMIT 1`,
    [email, otp]
  );

  if (result.rows.length === 0) {
    throw new AppError("Invalid OTP", 400);
  }

  const otpRecord = result.rows[0];

  if (new Date() > new Date(otpRecord.expires_at)) {
    throw new AppError("OTP has expired", 400);
  }

  res.status(200).json({
    success: true,
    message: "OTP verified successfully",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const {
    email,
    otp,
    password,
  } = req.body;

  const otpResult = await pool.query(
    `SELECT * FROM password_reset_otps
     WHERE email = $1
     AND otp = $2
     ORDER BY created_at DESC
     LIMIT 1`,
    [email, otp]
  );

  if (otpResult.rows.length === 0) {
    throw new AppError("Invalid OTP", 400);
  }

  const otpRecord = otpResult.rows[0];

  if (
    new Date() >
    new Date(otpRecord.expires_at)
  ) {
    throw new AppError(
      "OTP has expired",
      400
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  await pool.query(
    `UPDATE students
     SET password = $1
     WHERE email = $2`,
    [hashedPassword, email]
  );

  await pool.query(
    `DELETE FROM password_reset_otps
     WHERE email = $1`,
    [email]
  );

  res.status(200).json({
    success: true,
    message:
      "Password reset successfully",
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { full_name, phone } = req.body;

  const studentId = req.student.id;

  const result = await pool.query(
    `UPDATE students
     SET full_name = $1,
         phone = $2
     WHERE id = $3
     RETURNING id, full_name, email, phone`,
    [full_name, phone, studentId]
  );

  res.status(200).json({
    success: true,
    student: result.rows[0],
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const {
    currentPassword,
    newPassword,
  } = req.body;

  const studentId = req.student.id;

  const result = await pool.query(
    "SELECT * FROM students WHERE id = $1",
    [studentId]
  );

  const student = result.rows[0];

  const isMatch = await bcrypt.compare(
    currentPassword,
    student.password
  );

  if (!isMatch) {
    throw new AppError(
      "Current password is incorrect",
      400
    );
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  await pool.query(
    `UPDATE students
     SET password = $1
     WHERE id = $2`,
    [hashedPassword, studentId]
  );

  res.status(200).json({
    success: true,
    message:
      "Password changed successfully",
  });
});

module.exports = {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  updateProfile,
  changePassword,
};