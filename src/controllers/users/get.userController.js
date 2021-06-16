const { User } = require("../../models");

const service = async (req, res, next) => {
  try {
    const where = {};
    if (req.params.id) where.id = req.params.id;
    const requestDB = await User.scope("admin").findAll({
      attributes: { exclude: ["password"] },
      where,
    });
    if (req.params.id && !requestDB.length)
      req.response = { status: 404, msg: "data tidak ditemukan" };
    else
      req.response = {
        data: requestDB,
      };
  } catch (err) {
    req.response = { status: 500, msg: err.message };
  }
  next();
};

module.exports = { service };
