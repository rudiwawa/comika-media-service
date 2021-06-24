const { User } = require("../../models");

const service = async function (req, res, next) {
  try {
    const requestDB = await User.findOne({
      attributes: { exclude: ["password"] },
      where: { id: req.auth.id },
    });
    if (requestDB) {
      res.response = { data: requestDB };
    } else {
      res.response = { status: 404, msg: "user tidak ditemukan" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
