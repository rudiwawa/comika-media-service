const { OrderDetails, Sequelize, Product } = require("../../models");
const { setRupiah } = require("../../helpers/currency");
const { Op } = Sequelize;

const service = async function (req, res, next) {
  try {
    const requestDB = await OrderDetails.findAll({
      attributes: [
        [Sequelize.literal("Product.id"), "id"],
        [Sequelize.literal("Product.name"), "name"],
        [Sequelize.literal("Product.price"), "price"],
        [Sequelize.fn("sum", Sequelize.col("quantity")), "qty"],
        [Sequelize.fn("sum", Sequelize.col("total")), "total"],
      ],
      group: "product_id",
      where:
        req.params.report == "product"
          ? { [Op.or]: [{ type: "product" }, { type: "subscription" }] }
          : { type: "subscription" },
      include: { attributes: [], model: Product },
    });
    requestDB.map((product) => {
      product.priceRp = setRupiah(product.price);
      product.totalRp = setRupiah(product.total);
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
