const express = require("express");
const { CreateUser, loginUser } = require("../controllers/auth-controller");
const router = express.Router();

router.post("/register", CreateUser);
router.post("/login", loginUser);

module.exports = router;
