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
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "auther is requied"],
      ref: "User",
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// index for better query Selection
// BlogpostSchena.indexes({ title: 1 });

module.exports = mongoose.model("Blogpost", BlogpostSchena);
