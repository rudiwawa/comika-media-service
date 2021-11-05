const { Notification, Order, OrderDetails } = require("../../models");

const service = async function (req, res, next) {
  try {
    const where = { id: req.params.id };
    const requestDB = await Notification.findOne({
      where,
      include: [
        {
          attributes: ["id", "code", "price", "priceRp", "url", "status", "paymentType"],
          model: Order,
          include: {
            attributes: ["id", "name", "quantity", "img", "price", "priceRp", "total", "totalRp"],
            model: OrderDetails,
            as: "details",
          },
        },
      ],
    });
    if (requestDB) {
      Notification.update({ isRead: true }, { where });
      res.response = { data: requestDB };
    } else {
      res.response = { status: 404, msg: "notifikasi tidak ditemukan" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
