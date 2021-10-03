const midtransClient = require("midtrans-client");
const {
  Order,
  OrderDetails,
  Subscription,
  Sequelize: { Op },
} = require("../../models");
const moment = require("moment");
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_ENV == "production" ? true : false,
  serverKey: process.env.MIDTRANS_ENV == "production" ? process.env.MIDTRANS_KEY : process.env.MIDTRANS_KEY_DEV,
});

const createOrder = async (payload, subscription) => {
  try {
    payload.details = [
      {
        productId: subscription.id,
        name: subscription.name,
        type: "subscription",
        quantity: 1,
        capacity: subscription.longTime,
        price: subscription.price,
        total: subscription.price * 1,
      },
    ];
    const requestDB = Order.create(payload, {
      include: [{ model: OrderDetails, as: "details" }],
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
};

module.exports = async ({ subscription, user }) => {
  let parameter = {
    transaction_details: {
      order_id: subscription.code.toUpperCase() + "-" + Date.now(),
      gross_amount: subscription.price,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      userId: user.id,
      first_name: user.name,
      email: user.email,
      phone: user.phone,
    },
    item_details: {
      id: subscription.id,
      price: subscription.price,
      quantity: 1,
      name: subscription.name,
    },
  };
  try {
    const subscriptionLatest = await Subscription.count({
      where: { userId: user.id, availableOn: { [Op.gte]: moment() } },
    });
    if (subscriptionLatest > 7)
      throw new Error(
        `Kamu masih mempunyai ${subscriptionLatest} hari, Perpanjang subscription hanya bisa dilakukan pada 7 hari terakhir.`
      );
    const transaction = await snap.createTransaction(parameter);
    const dataOrder = {
      code: parameter.transaction_details.order_id,
      userId: user.id,
      price: subscription.price,
      token: transaction.token,
      url: transaction.redirect_url,
    };
    createOrder(dataOrder, subscription);
    return transaction;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
