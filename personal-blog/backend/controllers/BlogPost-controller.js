const Blogpost = require("../model/blogpost");

const getPost = async (req, res, next) => {
  try {
    const { title, author } = req.body;

    if (!title) {
      const error = new Error("Title is required");
      error.statusCode = 404;
      return next(error);
    }

    const findPost = await Blogpost.find({ title, author }).populate("author");

    if (!findPost.length) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      message: "Post found",
      data: findPost,
    });
  } catch (error) {
    console.log("Server Error", error);
    return next(error);
  }
};

const CreatePost = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    // const ExistingPost = await Blogpost.findOne({
    //   $or: [{ title }, { content }],
    // });
    const ExistingPost = await Blogpost.findOne({ title });
    if (ExistingPost) {
      const error = new Error("Title already Exists");
      error.statusCode(400);
      return next(error);
    }

    const newPost = new Blogpost({
      title,
      author,
      content,
    });
    await newPost.save();

    return res.status(200).json({
      message: "New post has been created",
      data: newPost,
      sucess: true,
    });
  } catch (error) {
    console.log("Server Error", error);
    return next(error);
  }
};
module.exports = { getPost, CreatePost };
