export const errorHandler = (err, req, res, next) => {
  console.log("🔥 ERROR STACK TRACE");
  console.log(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
