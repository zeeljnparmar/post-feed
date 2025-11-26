//Standard error handling function.

exports.errorResponse = (res, statusCode = 500, message = "internal_error", details = {}) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
    ...details
  });
};
