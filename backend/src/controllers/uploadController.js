const streamUpload = require("../utils/streamUpload");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Please upload an image.", 400);
  }

  const folder =
  req.body.folder || "campusbites";

const result = await streamUpload(
  req.file.buffer,
  folder
);

  res.status(200).json({
    success: true,
    imageUrl: result.secure_url,
  });
});

module.exports = {
  uploadImage,
};