import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "./logger.js";

const TryCatch = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err: any) {
      logger.error(err);
      res.status(500).json({ message: "Internal Server Error" });
      next(err);
    }
  };
};

export default TryCatch;
