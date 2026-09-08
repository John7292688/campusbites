const adminAuthMiddleware = require(
  "../middleware/adminAuthMiddleware"
);

const {
  adminLogin,
  getAllRestaurantsForAdmin,
  getRestaurantApplicationDetails,
  approveRestaurant,
  rejectRestaurant,
  suspendRestaurant,
  reactivateRestaurant,
} = require("../controllers/adminController");

const express = require("express");
const router = express.Router();

router.post("/login", adminLogin);

router.get(
  "/restaurants",
  adminAuthMiddleware,
  getAllRestaurantsForAdmin
);

router.get(
  "/restaurants/:id",
  adminAuthMiddleware,
  getRestaurantApplicationDetails
);

router.patch(
  "/restaurants/:id/approve",
  adminAuthMiddleware,
  approveRestaurant
);

router.patch(
  "/restaurants/:id/reject",
  adminAuthMiddleware,
  rejectRestaurant
);

router.patch(
  "/restaurants/:id/suspend",
  adminAuthMiddleware,
  suspendRestaurant
);

router.patch(
  "/restaurants/:id/reactivate",
  adminAuthMiddleware,
  reactivateRestaurant
);

module.exports = router;