class ErrorHandling extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public success: boolean
  ) {
    super(message);
    this.statusCode = statusCode || 500;
    this.success = success || false;

    Object.setPrototypeOf(this, ErrorHandling.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandling