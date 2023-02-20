const { OrderDetails, Sequelize, Product, Order } = require("../../models");
const { setRupiah } = require("../../helpers/currency");
const { Op } = Sequelize;

const service = async function (req, res, next) {
  try {
    const where =
      req.params.report == "product"
        ? { [Op.or]: [{ type: "product" }, { type: "subscription" }] }
        : { type: "discount" };
    const requestDB = await OrderDetails.findAll({
      attributes: [
        [Sequelize.literal("Product.id"), "id"],
        [Sequelize.literal("Product.name"), "name"],
        [Sequelize.literal("Product.price"), "price"],
        [Sequelize.fn("sum", Sequelize.col("quantity")), "qty"],
        [Sequelize.fn("sum", Sequelize.col("total")), "total"],
      ],
      group: "product_id",
      where,
      include: [
        { attributes: [], model: Order, where: { status: "settlement" } },
        { attributes: [], model: Product },
      ],
    });
    requestDB.map((product) => {
      if (req.params.report == "promo") {
        // product.dataValues.price = -product.dataValues.price;
        product.dataValues.total = -product.dataValues.total;
      }
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
