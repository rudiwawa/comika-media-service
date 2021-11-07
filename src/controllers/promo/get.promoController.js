const { Product } = require("../../models");

const service = async function (req, res, next) {
  try {
    const where = {};
    if (req.params.id) {
      where.id = req.params.id;
    }
    const requestDB = await Product.findAll({
      attributes: [
        "id",
        "name",
        "type",
        ["slug", "code"],
        "category",
        "description",
        "price",
        "isPublish",
        "publishedAt",
        "availableTo",
        "updatedAt",
      ],
      where,
    });
    if (req.params.id) {
      if (requestDB) {
        res.response = { data: requestDB[0] };
      } else {
        res.response = { status: 404, msg: "promo tidak ditemukan" };
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
