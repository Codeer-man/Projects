const Blogpost = require("../model/blogpost");
const { uploadToCloudinary } = require("../model/uploadToCloud");

const UploadImage = async (req, res) => {
  try {
    if (!file.path) {
      res.status(404).json({
        success: false,
        message: "file location not found",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newImage = new Blogpost({
      url,
      publicId,
    });

    await newImage.save();
    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      sucess: false,
      message: "Error uploading image",
    });
  }
};
module.exports = UploadImage;
