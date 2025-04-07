const Role = require("../middleware/Role-middleware");
const User = require("../model/auth-model");
const jwt = require("jsonwebtoken");

const CreateUser = async (req, res, next) => {
  try {
    const { email, username, password, role } = req.body;

    const ExistingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (ExistingUser) {
      const error = new Error("Username or email already exist");
      error.statusCode = 409;
      return next(error);
    }
    console.log("Request Body:", req.body);

    const CreateNewUser = new User({
      email,
      username,
      password,
      role: role || "User",
    });
    await CreateNewUser.save();

    return res.status(201).json({
      sucess: true,
      message: "New User has been created",
      token: await CreateNewUser.generateAccessToken(),
      data: CreateNewUser,
    });
  } catch (error) {
    console.log("Invalid server error");
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const getUser = await User.findOne({ $or: [{ username }, { email }] });

    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const matchPassword = await getUser.comparePassword(password);
    if (!matchPassword) {
      console.log("password doesnot match");
      return res.status(500).json({
        sucess: false,
        message: "Password doesnot match",
      });
    }
    const accessToken = await getUser.generateAccessToken();
    const refreshToken = await getUser.generateRefreshToken();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      sucess: true,
      message: "Login sucessfull",
      token: accessToken,
      refreshtoken: refreshToken,
      data: getUser,
    });
  } catch (error) {
    console.log("Invalid server error");
    return next(error);
  }
};

const GetUser = async (req, res) => {
  try {
    const Userdata = req.user;

    return res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      data: Userdata,
    });
  } catch (error) {
    console.error("Invalid server error", error);
    return next(error);
  }
};

const allUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return console.error("Users not found");
    }
    return res
      .status(200)
      .json({ message: "All the Users are found", data: users });
  } catch (error) {
    console.error("Invalid serve error", error);
    return res.status(500).json({
      sucess: false,
      message: "data Not found",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "Admin") {
      return res.status(500).json({ message: "Not allowed to remove admin " });
    }
    const deleteUser = await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User has been deleted successfully",
      deletedUser: deleteUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const verifyToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY
    );
    console.log("refresh token", verifyToken);

    const user = await User.findOne({ _id: verifyToken.userId });

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token in try" });
    }

    const newAccessToken = user.generateAccessToken();
    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.log("Invalid refresh token", error);
    return res.status(403).json({ message: "Invalid refresh token in catch" });
  }
};

module.exports = {
  CreateUser,
  loginUser,
  GetUser,
  refreshToken,
  allUser,
  deleteUser,
};
