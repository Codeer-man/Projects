const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);

    return {
      url: result.url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("not able to upload to cloudinary");
    throw new Error(error);
  }
};
module.exports = { uploadToCloudinary };
