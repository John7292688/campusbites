const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const streamUpload = (buffer, folder = "campusbites") => {
  return new Promise((resolve, reject) => {
    console.log("Uploading to folder:", folder);

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.log(
              "CLOUDINARY ERROR:"
            );
            console.log(error);

            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(buffer)
      .pipe(uploadStream);
  });
};

module.exports = streamUpload;