const { Product } = require("../../../models");
const service = async function (req, res, next) {
  try {
    if (!req.params.id) throw new Error("id tidak boleh kosong");
    const where = { id: req.params.id };
    const requestDB = await Product.destroy({ where });
    if (requestDB) res.response = { msg: "Produk berhasil dihapus" };
    else res.response = { status: 400, msg: "Produk gagal dihapus" };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };
