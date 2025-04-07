const User = require("../model/auth-model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const jwtToken = token.replace("Bearer ", "").trim();

  try {
    const verified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const Userdata = await User.findOne({ email: verified.email }).select(
      "-password"
    );
    console.log(Userdata);

    req.username = Userdata.username;
    req.user = Userdata;
    req.token = jwtToken;
    req.id = Userdata._id;
    next();
  } catch (error) {
    console.error("Invalid token", error);
    return next(error);
  }
};

module.exports = authMiddleware;
