const reviewService = require("../services/reviewService");

const createReview = async (req, res) => {
  try {
    const studentId = req.student.id;
    const { orderId, rating, review } = req.body;

    const newReview = await reviewService.createReview(
      studentId,
      orderId,
      rating,
      review
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      data: newReview,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getRestaurantReviews = async (req, res) => {
  try {
    const reviews =
      await reviewService.getRestaurantReviews(
        req.params.restaurantId
      );

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPackageReviews = async (req, res) => {
  try {
    const reviews =
      await reviewService.getPackageReviews(
        req.params.packageId
      );

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getRestaurantReviews,
  getPackageReviews,
};