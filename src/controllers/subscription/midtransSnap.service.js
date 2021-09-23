const midtransClient = require("midtrans-client");
const { Order } = require("../../models");
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_ENV == "production" ? true : false,
  serverKey: process.env.SERVER_KEY,
});

const createOrder = async (payload) => {
  try {
    const requestDB = Order.create(payload);
  } catch (error) {
    return Promise.reject(error.message);
  }
};

module.exports = async ({ package, customer }) => {
  let parameter = {
    transaction_details: {
      order_id: package.code.toUpperCase() + "-" + Date.now(),
      gross_amount: package.price,
    },
    credit_card: {
      secure: true,
    },
    customer_details: customer,
    item_details: {
      id: package.id,
      price: package.price,
      quantity: 1,
      name: package.name,
    },
  };
  try {
    const transaction = await snap.createTransaction(parameter);
    // console.log("transaction", transaction);
    const dataOrder = {
      id: parameter.transaction_details.order_id,
      userId: parameter.customer_details.userId,
      plan: parameter.item_details.name,
      price: parameter.item_details.price,
      url: transaction.redirect_url,
    };
    createOrder(dataOrder);
    return transaction;
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error.message);
  }
};
