const { User } = require("../../models");

module.exports = async (req, res, next) => {
  try {
    const where = {};
    if (req.params.id) where.id = req.params.id;
    const requestDB = await User.findAll({
      attributes: ["id", "name", "email"],
      where,
    });
    if (req.params.id && !requestDB.length) req.response = { status: 404, msg: "data tidak ditemukan" };
    else
      req.response = {
        data: requestDB,
      };
  } catch (err) {
    req.response = { status: 500, msg: err.message };
  }
  next();
};
