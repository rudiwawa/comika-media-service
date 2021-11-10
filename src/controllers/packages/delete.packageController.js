const { Product } = require("../../models");
const service = async function (req, res, next) {
  if (!req.params.id) throw new Error("id tidak boleh kosong");
  try {
    const where = { id: req.params.id };
    const requestDB = await Product.destroy({ where });
    res.response = { msg: "Paket berhasil dihapus", data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
