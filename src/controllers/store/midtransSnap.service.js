const midtransClient = require("midtrans-client");
const { StoreTranasaction } = require("../../models");
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

module.exports = async ({ transactionCode, total, customer, items }) => {
  const customer_details = {
    userId: customer.id,
    first_name: customer.name,
    email: customer.email,
    phone: customer.phone,
  };
  let parameter = {
    transaction_details: {
      order_id: transactionCode,
      gross_amount: total,
    },
    credit_card: {
      secure: true,
    },
    customer_details,
    item_details: items,
  };
  try {
    const transaction = await snap.createTransaction(parameter);
    // createOrder(dataOrder);
    return transaction;
  } catch (error) {
    throw new Error(error.message);
  }
};
