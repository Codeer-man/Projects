const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const {
  CreateProfile,
  getProfile,
} = require("../controllers/profile-controller");

const route = express.Router();

route.post(
  "/create/:id",
  authMiddleware,
  uploadMiddleware.single("profileImage"),
  CreateProfile
);

route.get("/getProfile/:id", authMiddleware, getProfile);

module.exports = route;
