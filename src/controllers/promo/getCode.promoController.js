const { Product } = require("../../models");

const service = async function (req, res, next) {
  try {
    const where = {
      slug: req.params.code,
    };
    const requestDB = await Product.scope("promo").findOne({
      attributes: ["id", "name", ["slug", "code"], "category", "price", "rupiah"],
      where,
    });
    if (requestDB) {
      res.response = { data: requestDB };
    } else res.response = { status: 404, msg: "promo tidak ditemukan" };
  } catch (error) {
    res.response = { status: 500, msg: error.toString() };
  }
  next();
};
module.exports = { service };
