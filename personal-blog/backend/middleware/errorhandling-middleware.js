const errorhandling = (err, req, res, next) => {
  // log full stack for debugging
  console.error(err.stack || err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Invalid Server Error";
  const error = err.error || null;

  return res.status(statusCode).json({
    sucess: false,
    message,
    error,
  });
};

module.exports = errorhandling;
