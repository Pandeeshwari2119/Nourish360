// errorMiddleware.js
export const errorHandler = (err, req, res, next) => {
  console.error('[Error Logger]:', err.message || err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred while processing your request.',
    safetyNotice: 'Nourish360 is committed to secure, reliable health guidance. Please review your input or try again.'
  });
};
