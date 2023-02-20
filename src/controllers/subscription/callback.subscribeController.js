const {
  Subscription,
  Order,
  OrderDetails,
  sequelize,
} = require("../../models");
const generateActivation = require("./generateActivation.service");
const sendEmail = require("../../services/sendEmail");
const sendNotification = require("../../services/sendNotification");
const service = async function (req, res, next) {
  try {
    const body = req.body;
    const where = { code: body.order_id, status: "pending" };
    const dataOrder = await Order.findOne({
      where,
      include: { model: OrderDetails, as: "details" },
    });
    if (dataOrder) {
      const t = await sequelize.transaction();
      const payload = {
        status: body.transaction_status,
        paymentType: body.payment_type,
      };
      await Order.update(payload, { where, transaction: t });
      if (req.body.status_code == 200) {
        let longTimeSubscription = 0;
        dataOrder.details.map((item) => {
          if (item.type === "subscription") {
            longTimeSubscription += Number(item.capacity);
          }
        });
        if (longTimeSubscription > 0) {
          await callbackSubscribe(dataOrder.userId, longTimeSubscription, t);
        }

        notification(
          { id: dataOrder.userId, orderId: dataOrder.id },
          dataOrder.code
        );
        res.response = {
          msg: "PEMBAYARAN " + dataOrder.code + " BERHASIL DITERIMA",
        };
      } else {
        res.response = {
          status: 400,
          msg: "transaction " + req.body.transaction_status,
          data: payload,
        };
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

const callbackSubscribe = async (userId, longTime, t) => {
  await generateActivation(userId, longTime, t);
  sendNotification.create(
    userId,
    `MEMBERSHIP ACTIVATION`,
    `Selamat, selama ${longTime} hari kedepan kamu menjadi member Comika Media.`,
    "https://api.comika.media/uploads/comika/membership.png",
    null,
    "informasi"
  );
};

const notification = (user, orderCode) => {
  sendNotification.create(
    user.id,
    `PEMBAYARAN ${orderCode.toUpperCase()} BERHASIL`,
    `Pembayaran dengan kode transaksi ${orderCode.toUpperCase()} hari berhasil diterima, Terima kasih atas kepercayaan terhadap Comika Media.`,
    "https://api.comika.media/uploads/comika/settlement.png",
    user.orderId
  );
  // sendEmail({ to: user.email, subject: `PEMBAYARAN ${orderId.toUpperCase()} BERHASIL`, body: msg });
};

module.exports = { service };
