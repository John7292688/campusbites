const cloudinary = require("../config/cloudinary");

const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    // Only delete images hosted on Cloudinary
    if (!imageUrl.includes("res.cloudinary.com")) {
      return;
    }

    // Example URL:
    // https://res.cloudinary.com/demo/image/upload/v123456/packages/abc123.jpg

    const parts = imageUrl.split("/upload/")[1];

    if (!parts) return;

    // Remove version number if present
    const publicId = parts
      .replace(/^v\d+\//, "")
      .replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
};

module.exports = deleteFromCloudinary;