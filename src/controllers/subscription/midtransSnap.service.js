const midtransClient = require("midtrans-client");
const {
  Order,
  Subscription,
  Sequelize: { Op },
} = require("../../models");
const moment = require("moment");
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_ENV == "production" ? true : false,
  serverKey: process.env.MIDTRANS_ENV == "production" ? process.env.MIDTRANS_KEY : process.env.MIDTRANS_KEY_DEV,
});

const createOrder = async (payload) => {
  try {
    const requestDB = Order.create(payload);
  } catch (error) {
    return Promise.reject(error.message);
  }
};

module.exports = async ({ package, user }) => {
  let parameter = {
    transaction_details: {
      order_id: package.code.toUpperCase() + "-" + Date.now(),
      gross_amount: package.price,
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
      id: package.id,
      price: package.price,
      quantity: 1,
      name: package.name,
    },
  };
  try {
    const subscriptionLatest = await Subscription.count({
      where: { userId: customer.userId, availableOn: { [Op.gte]: moment() } },
    });
    if (subscriptionLatest > 7)
      throw new Error(
        `Kamu masih mempunyai ${subscriptionLatest} hari, Perpanjang subscription hanya bisa dilakukan pada 7 hari terakhir.`
      );
    const transaction = await snap.createTransaction(parameter);
    const dataOrder = {
      id: parameter.transaction_details.order_id,
      userId: customer.userId,
      plan: package.name,
      price: package.price,
      token: transaction.token,
      url: transaction.redirect_url,
      longTime: package.longTime,
      packageId: package.id,
    };
    createOrder(dataOrder);
    return transaction;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
