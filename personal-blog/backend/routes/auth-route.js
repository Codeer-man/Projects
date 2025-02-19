const express = require("express");
const {
  CreateUser,
  loginUser,
  GetUser,
  refreshToken,
} = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/register", CreateUser);
router.post("/login", loginUser);

router.get("/getData", authMiddleware, GetUser);
router.get("/refreshToken", refreshToken);

module.exports = router;
