const jwt = require("jsonwebtoken");

const restaurantOwnerAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(
      req.method,
      req.originalUrl,
      decoded
    );

    // Ensure the token belongs to a restaurant owner
    if (decoded.role !== "restaurant_owner") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Restaurant owners only.",
      });
    }

    req.owner = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = restaurantOwnerAuthMiddleware;