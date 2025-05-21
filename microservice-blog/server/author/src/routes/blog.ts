import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { uploadFile } from "../middleware/multer";
import { createBlog, deleteBlog, updateBlog } from "../controller/blog";

const router = express.Router();

router.post("/blog/new", authMiddleware, uploadFile, createBlog);
router.put("/blog/:id/edit", authMiddleware, uploadFile, updateBlog);
router.delete("/blog/:id/delete", authMiddleware, deleteBlog);

export default router;
