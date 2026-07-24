const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "packages",

        // Automatically choose the best compression
        quality: "auto",

        // Convert every upload to WebP
        format: "webp",

        // Resize every image
        transformation: [
          {
            width: 800,
            height: 600,
            crop: "fill",
            gravity: "auto",
          },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadToCloudinary;