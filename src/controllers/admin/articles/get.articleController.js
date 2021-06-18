const { Article } = require("../../../models");

const service = async function (req, res, next) {
  try {
    const where = {};
    if (req.params.id) where.id = req.params.id;
    const requestDB = await Article.findAll({
      where,
    });
    if (req.params.id) {
      if (!requestDB.length)
        res.response = { status: 404, msg: "data tidak ditemukan" };
      else res.response = { data: requestDB[0] };
    } else
      res.response = {
        data: requestDB,
      };
  } catch (err) {
    res.response = { status: 500, msg: err.message };
  }
  next();
};

module.exports = { service };
