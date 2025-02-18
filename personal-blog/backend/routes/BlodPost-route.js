const express = require("express");
const {
  getPost,
  CreatePost,
  UpdatePost,
  DeletePost,
} = require("../controllers/BlogPost-controller");

const route = express.Router();

route.get("/getpost", getPost);
route.post("/createPost", CreatePost);
route.put("/:id/update", UpdatePost);
route.delete("/:id/delete", DeletePost);

module.exports = route;
