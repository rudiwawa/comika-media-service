const { Share } = require("../../models");
const service = async function (req, res, next) {
  if (
    req.body.shareTo == "WA" ||
    req.body.shareTo == "FB" ||
    req.body.shareTo == "LINE" ||
    req.body.shareTo == "TWITTER" ||
    req.body.shareTo == "LINK"
  ) {
    try {
      const payload = {
        articleId: req.article.id,
        userId: req.auth ? req.auth.id : null,
        shareTo: req.body.shareTo,
      };
      const requestDB = await Share.create(payload);
      res.response = { msg: "share berhasil ditambahkan", data: requestDB };
    } catch (error) {
      res.response = { status: 500, msg: error.message };
    }
  } else {
    res.response = {
      status: 400,
      msg: "Share to tidak sesuai ketentuan",
    };
  }
  next();
};

module.exports = { service };
