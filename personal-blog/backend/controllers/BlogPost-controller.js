const Blogpost = require("../model/blogpost");

const getPost = async (req, res, next) => {
  try {
    const findPost = await Blogpost.find();

    if (!findPost) {
      const error = new Error("No posts found");
      error.statusCode(404);
      return next(error);
    }

    return res.status(200).json({
      message: "Posts fetched successfully",
      data: findPost,
      sucess: true,
    });
  } catch (error) {
    console.log("Server Error", error);
    return next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findOnePost = await Blogpost.findById(id);

    if (!findOnePost)
      return res.status(404).json({ message: "No posts found" });
    return res.status(200).json({
      message: "Posts fetched successfully",
      data: findOnePost,
      sucess: true,
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

const UpdatePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingPost = await Blogpost.findById(id);
    if(!existingPost) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }

    const PostData = {
      title: req.body.title || existingPost.title,
      content: req.body.content || existingPost.content,
      author: req.body.author || existingPost.author,
    }
    const UpdatingPost = await Blogpost.findByIdAndUpdate(id,PostData);

    if (!UpdatingPost) {
      const error = new Error("Id not found");
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      sucess: true,
      message: "Post Updated sucessfully",
      data: UpdatingPost,
    });
  } catch (error) {
    console.log(("Invalid server error", error));
    return next(error);
  }
};

const DeletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteThePost = await Blogpost.findByIdAndDelete({ _id: id });

    if (!deleteThePost) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      sucess: true,
      message: "Post has been deleted",
      data: deleteThePost,
    });
  } catch (error) {
    console.log("Invalid server error:", error);
    return next(error);
  }
};
module.exports = { getPost, CreatePost, UpdatePost, DeletePost, getPostById };
