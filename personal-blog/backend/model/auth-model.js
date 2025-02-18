const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    // createAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { versionKey: false, strictQuery: true, timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.error("Invalid server error: ", error);
    return next(error);
  }
});

// comparePassword
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// generate token
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id,
        username: this.username,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log("Token not generated", error);
  }
};

module.exports = mongoose.model("User", userSchema);
