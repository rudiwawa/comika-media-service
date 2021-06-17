module.exports = (req, res, next) => {
  req.record = {
    url: req.originalUrl,
    method: req.method,
    payload: req.body,
    status: 100,
    userId: "user",
  };
  next();
};
