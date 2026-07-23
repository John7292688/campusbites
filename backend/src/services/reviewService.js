const reviewModel = require("../models/reviewModel");
const orderModel = require("../models/orderModel");

const createReview = async (
  studentId,
  orderId,
  rating,
  review
) => {
  // Check if the order exists
  const order = await orderModel.getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found.");
  }

if (order.student_id !== studentId) {
  throw new Error("You can only review your own orders.");
}

  // Ensure the order has been delivered
  if (order.status !== "Delivered") {
    throw new Error(
      "You can only review delivered orders."
    );
  }

  // Prevent duplicate reviews
  if (order.is_reviewed) {
    throw new Error(
      "This order has already been reviewed."
    );
  }

  // Extra safety check
  const existingReview =
    await reviewModel.getReviewByOrder(orderId);

  if (existingReview) {
    throw new Error(
      "A review already exists for this order."
    );
  }

  const restaurant =
  await orderModel.getRestaurantIdByOrderId(orderId);

if (!restaurant) {
  throw new Error("Restaurant not found for this order.");
}

const newReview =
  await reviewModel.createReview({
    orderId,
    studentId,
    restaurantId: restaurant.restaurant_id,
    packageId: null,
    rating,
    review,
  });

  await reviewModel.markOrderAsReviewed(orderId);

  return newReview;
};

const getRestaurantReviews = (restaurantId) => {
  return reviewModel.getRestaurantReviews(
    restaurantId
  );
};

const getPackageReviews = (packageId) => {
  return reviewModel.getPackageReviews(
    packageId
  );
};

module.exports = {
  createReview,
  getRestaurantReviews,
  getPackageReviews,
};