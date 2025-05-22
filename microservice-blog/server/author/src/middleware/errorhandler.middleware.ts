import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

interface CustomError extends Error {
  statusCode?: number;
  success?: boolean;
  errors?: any;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const success = err.success === false ? false : false;
  const message =
    err?.errors?.[0]?.message || err.message || "Something went wrong";

  logger.error("Error occurred:", err);

  res.status(statusCode).json({
    success,
    message,
    statusCode,
  });
};

export default errorHandler;
