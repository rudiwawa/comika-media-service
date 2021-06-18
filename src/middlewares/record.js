module.exports = (req, res, next) => {
  req.urlApps = req.protocol + "://" + req.get("host") + "/";
  req.record = {
    url: req.url + req.originalUrl,
    method: req.method,
    payload: req.body,
    status: 100,
    userId: "user",
  };
  next();
};
