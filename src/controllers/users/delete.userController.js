const { User } = require("../../models");

const service = async function (req, res, next) {
  try {
    const requestDB = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (requestDB) res.response = { msg: `data user berhasil dihapus` };
    else res.response = { status: 404, msg: `data gagal dihapus` };
  } catch (error) {
    res.response = { status: 500, msg: err.message };
  }
  next();
};
module.exports = { service };
