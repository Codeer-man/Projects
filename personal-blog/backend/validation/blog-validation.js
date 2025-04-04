const z = require("zod");

const blogValidation = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(3, { message: "minimum 3 words is required" }),

  content: z.string({ message: "Content is required" }).min(10).trim(),

  // author: z.string({ message: "Author is required" }),
});

module.exports = blogValidation;
