const z = require("zod");

const RegisterValidation = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .email({ message: "Email is invalid" }),

  username: z
    .string({ message: "Username is required" })
    .trim()
    .min(3, { message: "Username must be 3 characters long" })
    .max(25, { message: "Username cannot have more than 25 characters" }),

  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  // .max(20, { message: "Password must be at most 20 characters long" }),
});

const LoginValidation = z.object({
  username: z
    .string({ message: "Username is required" })
    .trim()
    .min(3, { message: "Username must be 3 characters long" })
    .max(25, { message: "Username cannot have more than 25 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

module.exports = { RegisterValidation, LoginValidation };
