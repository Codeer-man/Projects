import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandling from "../utils/ErrorHandling.js";
import { IUser } from "../model/User.js";

export interface AuthRequest extends Request {
  user?: IUser | null;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decodedToken) {
      throw new ErrorHandling("Invalid Token", 403, false);
    }

    logger.info(`User ${decodedToken.id} is authenticated`);

    req.user = decodedToken as IUser;
    next();
  } catch (err) {
    logger.error("Error in auth middleware", err);
    console.error(err);
    res.status(401).json({ message: "Authentication failed" });
  }
};
