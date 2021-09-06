const { Address } = require("../../../models");
const service = async function (req, res, next) {
  try {
    if (!req.params.id) throw new Error("id tidak boleh kosong");
    const where = { id: req.params.id, userId: req.auth.id };
    const requestDB = await Address.destroy({ where });
    if (requestDB) res.response = { msg: "Alamat berhasil dihapus" };
    else res.response = { status: 400, msg: "Alamat gagal dihapus" };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };
