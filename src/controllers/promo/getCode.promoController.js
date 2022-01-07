const {
  Product,
  Sequelize: { Op },
} = require("../../models");
const moment = require("moment");

const service = async function (req, res, next) {
  try {
    const where = {
      slug: req.params.code,
      publishedAt: {
        [Op.lte]: moment().add(7, "hours"),
      },
      availableTo: {
        [Op.gte]: moment().add(7, "hours"),
      },
    };
    const requestDB = await Product.scope("promoActive").findOne({
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
