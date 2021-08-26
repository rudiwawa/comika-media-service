const { Category } = require("../../../models");
const service = async function (req, res, next) {
  try {
    const where = {};
    if (req.params.id) where.id = req.params.id;
    const requestDB = await Category.findAll({ where, order: [["createdAt", "desc"]] });
    if (where.id) {
      if (requestDB.length) res.response = { data: requestDB[0] };
      else res.response = { status: 404, msg: "Kategori tidak ditemukan" };
    } else res.response = { data: requestDB };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };
