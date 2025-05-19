import { ErrorRequestHandler } from "express";

const errorhanlder: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message;
  err.success = err.success || false;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default errorhanlder;
