const bcrypt = require("bcrypt");
const pool = require("../config/database");

const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { full_name, phone, email, password } = req.body;

    // Validate input
    if (!full_name || !phone || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "Full name, phone, email and password are required",
  });
}

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Check if the email already exists
    const existingUser = await pool.query(
      "SELECT * FROM students WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new student
    await pool.query(
  "INSERT INTO students (full_name, phone, email, password) VALUES ($1, $2, $3, $4)",
  [full_name, phone, email, hashedPassword]
);

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find the student by email
    const result = await pool.query(
      "SELECT * FROM students WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Compare passwords
const student = result.rows[0];

const isPasswordCorrect = await bcrypt.compare(
  password,
  student.password
);

if (!isPasswordCorrect) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
}

return res.status(200).json({
  success: true,
  message: "Login successful",
  token: generateToken(student.id),
  student: {
    id: student.id,
    full_name: student.full_name,
    phone: student.phone,
    email: student.email,
  },
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
  register,
  login,
};