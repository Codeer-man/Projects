const express = require("express");
const { getPost, CreatePost } = require("../controllers/BlogPost-controller");

const route = express.Router();

route.get("/getpost", getPost);
route.post("/createPost", CreatePost);

module.exports = route;
