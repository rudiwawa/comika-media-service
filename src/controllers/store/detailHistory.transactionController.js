const { Order, OrderDelivery, OrderDetails } = require("../../models");

const service = async function (req, res, next) {
  try {
    const requestDB = await Order.findOne({
      attributes: ["code"],
      include: [
        {
          attributes: ["name", "address", "courier", "qty", "totalRp", "total", "status", "createdAt"],
          model: OrderDelivery,
        },
        {
          attributes: ["name", "type", "quantity", "img", "price", "total", "priceRp", "totalRp"],
          model: OrderDetails,
          as: "details",
        },
      ],
      where: { code: req.params.id },
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.toString() };
  }
  next();
};

module.exports = { service };
