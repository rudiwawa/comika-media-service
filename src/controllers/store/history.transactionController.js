const { Order, OrderDelivery } = require("../../models");

const service = async function (req, res, next) {
  try {
    const requestDB = await Order.findAll({
      attributes: ["code"],
      include: [
        {
          attributes: ["name", "address", "courier", "qty", "totalRp", "total", "status", "createdAt"],
          model: OrderDelivery,
        },
      ],
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.toString() };
  }
  next();
};

module.exports = { service };
