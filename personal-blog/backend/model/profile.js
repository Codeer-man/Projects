const mongoose = require("mongoose");

const UserProfile = new mongoose.Schema(
  {
    username: {
      type: String,
      require: false,
    },
    profilePic: {
      type: String,
      require: false.value,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
    AboutMe: {
      type: String,
      require: false,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", UserProfile);
