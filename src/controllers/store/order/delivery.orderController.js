const { OrderDelivery, Order } = require("../../../models");

const service = async (req, res, next) => {
  try {
    const result = await OrderDelivery.findAll({
      attributes: ["id", "noResi", "phone", "name", "address", "courier", "status"],
      include: [
        {
          as: "storeDetails",
          model: Order,
          attributes: ["code", "paymentType"],
          where: [{ status: "settlement" }],
        },
      ],
      order: [["status", "ASC"]],
    });
    res.response = { data: result };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
