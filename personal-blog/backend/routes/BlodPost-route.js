const express = require("express");
const {
  getPost,
  getPostById,
  CreatePost,
  UpdatePost,
  DeletePost,
  userBlog,
} = require("../controllers/BlogPost-controller");
const blogValidation = require("../validation/blog-validation");
const validation = require("../middleware/validation-middleware");
const authMiddleware = require("../middleware/auth-middleware");
// Multer
const uploadMiddleware = require("../middleware/upload-middleware");

const route = express.Router();

route.get("/getpost", getPost);
route.get("/getPostbyId/:id", getPostById);

route.get("/myBlog/:author", userBlog);
route.post(
  "/createPost",
  authMiddleware,
  uploadMiddleware.single("image"),
  validation(blogValidation),
  CreatePost
);

route.post("/createPost");
route.patch("/:id/update", UpdatePost);
route.delete("/:id/delete", DeletePost);

module.exports = route;
