const { Jumbotron } = require("../../models");
const service = async function (req, res, next) {
  const payload = {
    sequence: req.body.sequence,
    link: req.body.link,
    isPhone: req.body.isPhone,
    isDekstop: req.body.isDekstop,
  };
  if (req.file) {
    payload.img = req.urlApps + req.file.path;
  }
  try {
    const requestDB = await Jumbotron.create(payload);
    res.response = { msg: "jumbotron berhasil ditambahkan", data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message, data: error };
  }
  next();
};

module.exports = { service };
