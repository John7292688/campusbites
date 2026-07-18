const jwt = require("jsonwebtoken");

const generateToken = (studentId) => {
  return jwt.sign(
    { id: studentId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;