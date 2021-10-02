const { Product } = require("../../models");
const service = async function (req, res, next) {
  try {
    const requestDB = await Product.scope("subscription").findAll({
      attributes: ["id", "name", "price", "rupiah", ["capacity", "longTime"], "description"],
      order: [["sequence", "asc"]],
    });
    if (req.params.id) {
      if (requestDB.length) {
        requestDB[0].description = requestDB[0].description.split("~");
        res.response = {
          data: requestDB[0],
        };
      } else {
        res.response = { status: 404, msg: "paket tidak ditemukan" };
      }
    } else {
      res.response = {
        data: requestDB.map((item) => {
          item.description = item.description.split("~");
          return item;
        }),
      };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
