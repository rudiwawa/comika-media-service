module.exports = (req, res, next) => {
  req.urlApps = req.protocol + "://" + "api.comika.media";
  req.record = {
    url: req.urlApps + req.originalUrl,
    method: req.method,
    payload: req.body,
    status: 100,
    userId: null,
  };
  req.urlApps = req.urlApps + "/";

  next();
};
