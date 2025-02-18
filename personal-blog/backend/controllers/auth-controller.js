const User = require("../model/auth-model");

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
      token: await CreateNewUser.generateToken(),
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

    return res.status(200).json({
      sucess: true,
      message: "Login sucessfull",
      token: await getUser.generateToken(),
      data: getUser,
    });
  } catch (error) {
    console.log("Invalid server error");
    return next(error);
  }
};

module.exports = { CreateUser, loginUser };
