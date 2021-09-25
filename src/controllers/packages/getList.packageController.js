const { Package } = require("../../models");
const service = async function (req, res, next) {
  try {
    const requestDB = await Package.scope("public").findAll({
      attributes: ["id", "name", "price", "rupiah", "longTime", "description"],
    });
    if (req.params.id) {
      if (requestDB.length) {
        res.response = {
          data: requestDB[0],
        };
      } else {
        res.response = { status: 404, msg: "paket tidak ditemukan" };
      }
    } else {
      res.response = { data: requestDB };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
