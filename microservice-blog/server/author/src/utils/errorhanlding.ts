export default class ErrorHanldling extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public success: boolean
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = success || false;
    this.message = message || "Error in the error handler";

    Object.setPrototypeOf(this, ErrorHanldling.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}
