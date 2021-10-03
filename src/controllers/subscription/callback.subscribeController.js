const { Subscription, Order, OrderDetails } = require("../../models");
const generateActivation = require("./generateActivation.service");
const service = async function (req, res, next) {
  try {
    const body = req.body;
    const where = { code: body.order_id };
    const dataOrder = await Order.findOne({ where, include: { model: OrderDetails, as: "details" } });
    if (dataOrder) {
      if (dataOrder.status === "settlement") {
        res.response = { status: 400, msg: `order ${dataOrder.code} sudah dibayar` };
      } else {
        const payload = {
          status: body.transaction_status,
          paymentType: body.payment_type,
        };
        const longTime = dataOrder.details.map((order) => order.capacity).reduce((a, b) => a + b, 0);
        Order.update(payload, { where });
        if (req.body.status_code == 200) {
          const listActivation = await generateActivation(dataOrder.userId, longTime);
          res.response = { msg: `plan ${dataOrder.code} berhasil diaktifkan`, data: listActivation };
        } else {
          res.response = { msg: "Ok", data: { id: body.order_id, ...payload } };
        }
      }
    } else {
      res.response = { status: 404, msg: "order tidak ditemukan" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
