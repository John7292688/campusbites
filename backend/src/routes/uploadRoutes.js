const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  uploadImage,
} = require("../controllers/uploadController");

const restaurantOwnerAuthMiddleware = require("../middleware/restaurantOwnerAuthMiddleware");

// Upload Image
router.post(
  "/image",
  restaurantOwnerAuthMiddleware,
  upload.single("image"),
  uploadImage
);

module.exports = router;