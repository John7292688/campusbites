const pool = require("../config/database");

const createReview = async ({
  orderId,
  studentId,
 restaurantId,
  packageId,
  rating,
  review,
}) => {
  const result = await pool.query(
    `
    INSERT INTO reviews (
      order_id,
      student_id,
      restaurant_id,
      package_id,
      rating,
      review
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
    [
      orderId,
      studentId,
      restaurantId,
      packageId,
      rating,
      review,
    ]
  );

  return result.rows[0];
};

const getReviewByOrder = async (orderId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM reviews
    WHERE order_id = $1;
    `,
    [orderId]
  );

  return result.rows[0];
};

const getRestaurantReviews = async (restaurantId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM reviews
    WHERE restaurant_id = $1
    ORDER BY created_at DESC;
    `,
    [restaurantId]
  );

  return result.rows;
};

const getPackageReviews = async (packageId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM reviews
    WHERE package_id = $1
    ORDER BY created_at DESC;
    `,
    [packageId]
  );

  return result.rows;
};

const markOrderAsReviewed = async (orderId) => {
  await pool.query(
    `
    UPDATE orders
    SET is_reviewed = TRUE
    WHERE id = $1;
    `,
    [orderId]
  );
};

module.exports = {
  createReview,
  getReviewByOrder,
  getRestaurantReviews,
  getPackageReviews,
  markOrderAsReviewed,
};