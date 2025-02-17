const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is requied"],
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "8 letter is required"],
    },
    role: {
      type: String,
      default: "User",
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, strictQuery: true, timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
