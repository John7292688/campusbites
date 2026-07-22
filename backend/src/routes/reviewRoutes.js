const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

// Student submits a review
router.post(
  "/",
  authMiddleware,
  reviewController.createReview
);

// Public: Get all reviews for a restaurant
router.get(
  "/restaurant/:restaurantId",
  reviewController.getRestaurantReviews
);

// Public: Get all reviews for a package
router.get(
  "/package/:packageId",
  reviewController.getPackageReviews
);

module.exports = router;