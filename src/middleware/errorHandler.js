/**
 * Global error handling middleware
 */

/**
 * Error handler middleware to provide consistent error responses
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Determine status code
  const statusCode = err.statusCode || 500;
  
  // Base error response
  const errorResponse = {
    success: false,
    message: err.message || 'An unexpected error occurred',
  };

  // Add validation errors if available
  if (err.errors) {
    errorResponse.errors = err.errors;
  }

  // Only add stack trace in development environment
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
}

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    if (errors) {
      this.errors = errors;
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, errors = null) {
    return new ApiError(message, 400, errors);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(message, 404);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(message, 500);
  }
}

module.exports = {
  errorHandler,
  ApiError
};
