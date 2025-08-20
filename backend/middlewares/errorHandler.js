module.exports = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
    details: err.message,
  });
};
