const express = require("express");
const {
  getPost,
  getPostById,
  CreatePost,
  UpdatePost,
  DeletePost,
} = require("../controllers/BlogPost-controller");
const blogValidation = require("../validation/blog-validation");
const validation = require("../middleware/validation-middleware");

const route = express.Router();

route.get("/getpost", getPost);
route.get("/getPostbyId/:id", getPostById);
route.post("/createPost", validation(blogValidation), CreatePost);
route.put("/:id/update", UpdatePost);
route.delete("/:id/delete", DeletePost);

module.exports = route;
