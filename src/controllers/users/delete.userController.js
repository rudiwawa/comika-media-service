const { User } = require("../../models");

module.exports = async function (req, res, next) {
  try {
    const requestDB = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (requestDB) req.response = { msg: `data user berhasil dihapus` };
    else req.response = { msg: `data user gagal dihapus` };
  } catch (error) {
    req.response = { status: 500, msg: err.message };
  }
  next();
};
