const { Comika } = require("../../models");
const service = async function (req, res, next) {
  try {
    if (!req.params.id) throw new Error("id tidak boleh kosong");
    const where = { id: req.params.id };
    const requestDB = await Comika.destroy({ where });
    res.response = { msg: "data berhasil dihapus" };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };
