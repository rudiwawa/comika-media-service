module.exports = (req, res, next) => {
  req.urlApps = req.protocol + "://" + "service-comika.herokuapp.com" + "/";
  req.record = {
    url: req.url + req.originalUrl,
    method: req.method,
    payload: req.body,
    status: 100,
    userId: null,
  };
  next();
};
