import express from "express";
import {
  GetUserProfile,
  loginUser,
  myProfile,
  updateProfileImage,
  updateUserProfile,
} from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middeware.js";
import uploadFile from "../middleware/multer.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/user-profile", authMiddleware, myProfile);
router.get("/user/:userId", GetUserProfile);
router.put("/updateProfile", authMiddleware, updateUserProfile);
router.post("/uploadImage", authMiddleware, uploadFile, updateProfileImage);

export default router;
