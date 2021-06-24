const { Article } = require("../../models");

const service = async function (req, res, next) {
  if (!req.params.id) {
    res.response = { status: 400, msg: "id tidak boleh kosong" };
  } else {
    try {
      const where = {
        id: req.params.id,
      };
      const requestDB = await Article.findAll({
        where,
      });
      if (!requestDB.length)
        res.response = { status: 404, msg: "artikel tidak ditemukan" };
      else res.response = { data: requestDB[0] };
    } catch (err) {
      res.response = { status: 500, msg: err.message };
    }
  }
  next();
};

module.exports = { service };
