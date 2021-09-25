const { Subscription, Order } = require("../../models");
const generateActivation = require("./generateActivation.service");
const service = async function (req, res, next) {
  try {
    const body = req.body;
    const where = { id: body.order_id };
    const dataOrder = await Order.findOne({ where });
    if (dataOrder) {
      if (dataOrder.status === "settlementa") {
        res.response = { status: 400, msg: `order ${dataOrder.id} sudah dibayar` };
      } else {
        const payload = {
          status: body.transaction_status,
          paymentType: body.payment_type,
        };
        Order.update(payload, { where });
        if (req.body.status_code == 200) {
          const listActivation = await generateActivation(dataOrder.userId, dataOrder.longTime);
          res.response = { msg: `plan ${dataOrder.plan} berhasil diaktifkan`, data: listActivation };
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
