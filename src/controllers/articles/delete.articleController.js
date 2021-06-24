const { Article } = require("../../models");

const service = async function (req, res, next) {
  try {
    const requestDB = await Article.destroy({ where: { id: req.params.id } });
    if (requestDB) res.response = { msg: `data user berhasil dihapus` };
    else res.response = { status: 404, msg: `data gagal dihapus` };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
module.exports = { service };
