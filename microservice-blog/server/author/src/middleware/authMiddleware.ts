import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import ErrorHanldling from "../utils/errorhanlding";
import logger from "../utils/logger";

interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  image: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  bio: string;
  public_id: string;
}
export interface AuthRequest extends Request {
  user?: IUser | null;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new ErrorHanldling("Token not provided", 403, false);
    }
    const decode = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decode) {
      throw new ErrorHanldling("Unauthorized access denied", 403, false);
    }

    req.user = decode as IUser;
    next();
  } catch (error) {
    logger.error("Error in auth middleware", error);
    next(error);
  }
};
