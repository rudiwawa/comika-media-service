const { Product } = require("../../models");
const service = async function (req, res, next) {
  try {
    const where = { type: "subscription" };
    if (req.params.id) where.id = req.params.id;
    const requestDB = await Product.findAll({
      attributes: [
        "id",
        "name",
        ["slug", "code"],
        "price",
        "rupiah",
        ["capacity", "longTime"],
        "description",
        "isPublish",
        "publishedAt",
        "availableTo",
      ],
      where,
    });
    if (req.params.id) {
      if (requestDB.length) {
        requestDB[0].dataValues.description = requestDB[0].dataValues.description.split("~");
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
