const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const streamUpload = (buffer, folder = "campusbites") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = streamUpload;