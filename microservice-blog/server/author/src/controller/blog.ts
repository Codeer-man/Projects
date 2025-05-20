import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import ErrorHanldling from "../utils/errorhanlding";

export const createBlog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, blogContent } = req.body;

    const file = req.file;

    if (!file) {
      throw new ErrorHanldling("Please upload a blog image", 401, false);
    }
  } catch (error) {}
};
