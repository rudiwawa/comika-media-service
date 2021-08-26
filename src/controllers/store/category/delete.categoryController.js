const { Category } = require("../../../models");
const service = async function (req, res, next) {
  try {
    if (!req.params.id) throw new Error("id tidak boleh kosong");
    const where = { id: req.params.id };
    const requestDB = await Category.destroy({ where });
    if (requestDB) res.response = { msg: "Source berhasil dihapus" };
    else res.response = { status: 400, msg: "Source gagal dihapus" };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };
