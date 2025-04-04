const mongoose = require("mongoose");


const BlogpostSchena = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is requied"],
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: [true, "content is requied"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// index for better query Selection
BlogpostSchena.indexes({ title: 1 });

module.exports = mongoose.model("Blogpost", BlogpostSchena);
