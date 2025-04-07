const express = require("express");
const {
  CreateUser,
  loginUser,
  GetUser,
  refreshToken,
  allUser,
  deleteUser,
} = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");
const validation = require("../middleware/validation-middleware");
const {
  RegisterValidation,
  LoginValidation,
} = require("../validation/auth-validation");
const Role = require("../middleware/Role-middleware");

const router = express.Router();

router.post("/register", validation(RegisterValidation), CreateUser);
router.post("/login", validation(LoginValidation), loginUser);

router.get("/getData", authMiddleware, GetUser);
router.get("/refreshToken", refreshToken);
router.get("/users", authMiddleware, allUser);

router.delete("/deleteUser/:id", authMiddleware, Role, deleteUser);

module.exports = router;
