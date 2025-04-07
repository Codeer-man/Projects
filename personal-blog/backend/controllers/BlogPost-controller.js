const Blogpost = require("../model/blogpost");
const { uploadToCloudinary } = require("../helper/Cloudinary_helper");
const blogpost = require("../model/blogpost");

const getPost = async (req, res, next) => {
  try {
    const findPost = await Blogpost.find();

    if (!findPost) {
      const error = new Error("No posts found");
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      message: "Posts fetched successfully",
      data: findPost,
      success: true,
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

    if (!findOnePost) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json({
      message: "Post found successfully",
      data: findOnePost,
      success: true,
    });
  } catch (error) {
    console.log("Server Error", error);
    return next(error);
  }
};

const CreatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newPost = new Blogpost({
      title,
      content,
      url,
      author: req.id,
      authorUsername: req.username,
      publicId,
      image: url,
    });

    await newPost.save();

    return res.status(201).json({
      message: "New post has been created",
      data: newPost,
      success: true,
    });
  } catch (error) {
    console.log("Server Error:", error);
    return next(error);
  }
};

const UpdatePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingPost = await Blogpost.findById(id);
    if (!existingPost) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }

    const PostData = {
      title: req.body.title || existingPost.title,
      content: req.body.content || existingPost.content,
      author: req.body.author || existingPost.author,
    };

    const UpdatingPost = await Blogpost.findByIdAndUpdate(id, PostData, {
      new: true,
    });

    if (!UpdatingPost) {
      const error = new Error("Id not found");
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      message: "Post Updated successfully",
      data: UpdatingPost,
    });
  } catch (error) {
    console.log("Invalid server error:", error);
    return next(error);
  }
};

const DeletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteThePost = await Blogpost.findByIdAndDelete(id);

    if (!deleteThePost) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "Post has been deleted",
      data: deleteThePost,
    });
  } catch (error) {
    console.log("Invalid server error:", error);
    return next(error);
  }
};

const userBlog = async (req, res, next) => {
  const { author } = req.params;
  try {
    if (!author) {
      return res.status(400).json({ message: "Author is required" });
    }

    const userData = await blogpost
      .find({ author: author })
      .populate("author", "username email")
      .exec();

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User blog not found" });
    }
    return res.status(200).json({
      sucess: true,
      message: "User blog found",
      data: userData,
    });
  } catch (error) {
    console.log("Invalid server error:", error);
    return next(error);
  }
};

const postCounter = async (req, res, next) => {
  try {
    const { author } = req.params;
    const count = await Blogpost.countDocuments({ author: author });

    return res.status(200).json({
      success: true,
      message: "Blog post count retrieved successfully",
      count: count,
      author: author,
    });
  } catch (error) {
    console.error("Error counting posts:", error);
    return next(error);
  }
};

module.exports = {
  getPost,
  CreatePost,
  UpdatePost,
  DeletePost,
  getPostById,
  userBlog,
  postCounter,
};
