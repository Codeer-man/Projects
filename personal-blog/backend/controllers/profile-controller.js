const { uploadToCloudinary } = require("../helper/Cloudinary_helper");
const Profile = require("../model/profile");

const CreateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, AboutMe } = req.body;

    const existingUser = await Profile.findOne({ userID: id });
    if (existingUser) {
      return res.status(403).json({
        sucess: false,
        message: "Data already exist",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newProfile = new Profile({
      username,
      AboutMe,
      userID: id,
      profilePic: url,
      publicId: publicId,
    });

    await newProfile.save();

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: newProfile,
    });
  } catch (error) {
    console.error("Profile creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const findprofile = await Profile.findOne({ userID: id });
    if (!findprofile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }
    return res
      .status(200)
      .json({ sucess: true, message: "profile found", data: findprofile });
  } catch (error) {
    console.error("Invalid server error");
    throw new Error(error);
  }
};

module.exports = { CreateProfile, getProfile };
