module.exports = (req, res, next) => {
  req.urlApps = req.protocol + "://" + "api.comika.media/" + "/";
  req.record = {
    url: req.url + req.originalUrl,
    method: req.method,
    payload: req.body,
    status: 100,
    userId: null,
  };
  next();
};
