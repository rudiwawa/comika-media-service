const { Product } = require("../../models");

const service = async function (req, res, next) {
  try {
    const where = { id: req.params.id };
    const requestDB = await Product.destroy({ where });
    if (requestDB) res.response = { msg: "promo berhasil dihapus" };
    else res.response = { status: 500, msg: "promo gagal dihapus" };
  } catch (error) {
    res.response = { msg: error.toString(), status: 500 };
  }
  next();
};

module.exports = { service };
