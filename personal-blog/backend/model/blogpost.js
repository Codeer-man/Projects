const mongoose = require("mongoose");

const BlogpostSchena = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is requied"],
      trim: true,
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
    authorUsername: {
      type: String,
      require: true,
      trim: true,
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

// updated schema

// const mongoose = require("mongoose");

// const BlogpostSchena = new mongoose.Schema(
//   {
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "user",
//       require: true,
//     },
//     title: {
//       type: String,
//       require: true,
//     },
//     content: {
//       type: {
//         type: String,
//         enum: ["text", "image"],
//         require: true,
//       },
//       value: {
//         type: mongoose.Schema.Types.Mixed,
//         require: true,
//       },
//     },
//     tags: [String],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Blogpost", BlogpostSchena);
