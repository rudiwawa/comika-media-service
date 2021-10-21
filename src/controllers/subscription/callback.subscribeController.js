const { Subscription, Order, OrderDetails, sequelize } = require("../../models");
const generateActivation = require("./generateActivation.service");
const sendEmail = require("../../services/sendEmail");
const sendNotification = require("../../services/sendNotification");
const service = async function (req, res, next) {
  try {
    const body = req.body;
    const where = { code: body.order_id, status: "pending" };
    const dataOrder = await Order.findOne({ where, include: { model: OrderDetails, as: "details" } });
    if (dataOrder) {
      const t = await sequelize.transaction();
      const payload = {
        status: body.transaction_status,
        paymentType: body.payment_type,
      };
      await Order.update(payload, { where, transaction: t });
      if (req.body.status_code == 200) {
        res.response = await paymentSuccess(dataOrder, t);
      } else {
        res.response = { status: 400, msg: "transaction " + req.body.transaction_status, data: payload };
      }
      await t.commit();
    } else {
      res.response = { status: 404, msg: "order tidak ditemukan" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const callbackSubscribe = async (dataOrder, t) => {
  const longTime = dataOrder.details.map((order) => order.capacity).reduce((a, b) => a + b, 0);
  await generateActivation(dataOrder.userId, longTime, t);
  return { msg: `plan ${dataOrder.code} berhasil diaktifkan` };
};

const paymentSuccess = async (dataOrder, t) => {
  const orderType = dataOrder.type;
  if (orderType === "subscription") {
    notification(
      { id: dataOrder.userId },
      dataOrder.code,
      `Pembelian paket subscription ${dataOrder.code} selama ${dataOrder.details[0].capacity} hari seharga berhasil diterima, selamat menikmati konten-konten premium Comika Media.`
    );
    return await callbackSubscribe(dataOrder, t);
  } else if (orderType === "store") {
    notification(
      { id: dataOrder.userId },
      dataOrder.code,
      `Pembelian item store ${dataOrder.code} berhasil diterima, selamat menikmati merchandise Comika Media.`
    );
    return { msg: `transaksi ${dataOrder.code} berhasil dibayar` };
  } else {
    return { status: 400, msg: "tipe transaksi tidak sesuai" };
  }
};

const notification = (user, orderId, msg) => {
  sendNotification.create(user.id, `PEMBAYARAN ${orderId.toUpperCase()} BERHASIL`, msg);
  // sendEmail({ to: user.email, subject: `PEMBAYARAN ${orderId.toUpperCase()} BERHASIL`, body: msg });
};

module.exports = { service };
