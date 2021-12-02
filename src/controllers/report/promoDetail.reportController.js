const { OrderDetails, Sequelize, Product, Order } = require("../../models");
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
        [
          Sequelize.fn(
            "date_format",
            Sequelize.fn("min", Sequelize.col("OrderDetails.created_at")),
            "%d %M %Y"
          ),
          "startDate",
        ],
        [
          Sequelize.fn(
            "date_format",
            Sequelize.fn("max", Sequelize.col("OrderDetails.created_at")),
            "%d %M %Y"
          ),
          "lastDate",
        ],
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("OrderDetails.created_at"),
            "%Y-%m"
          ),
          "created",
        ],
        [
          Sequelize.fn("week", Sequelize.col("OrderDetails.created_at")),
          "week",
        ],
      ],
      group: ["id", "week", "created"],
      order: [
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("OrderDetails.created_at"),
            "%Y-%m"
          ),
          "ASC",
        ],
      ],
      where: { "$Product.id$": req.params.id, type: "discount" },
      include: [
        {
          attributes: [],
          model: Order,
          as: "Order",
          where: {
            status: "settlement",
          },
        },
        { attributes: [], model: Product },
      ],
    });
    requestDB.map((product) => {
      if (product.price > 100) {
        product.priceRp = setRupiah(product.price);
      } else {
        product.dataValues.promo = product.price + " %";
      }
      product.totalRp = setRupiah(product.total);
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
