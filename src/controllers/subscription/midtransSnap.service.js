const midtransClient = require("midtrans-client");
const { Order } = require("../../models");
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

const listPackage = {
  yearly: {
    id: 1,
    price: 1499900,
    quantity: 1,
    name: "YEARLY",
  },
  monthly: {
    id: 2,
    price: 124900,
    quantity: 1,
    name: "MONTHLY",
  },
  weekly: {
    id: 3,
    price: 29900,
    quantity: 1,
    name: "WEEKLY",
  },
};

const createOrder = async (parameter) => {
  try {
    const payload = {
      id: parameter.transaction_details.order_id,
      userId: parameter.customer_details.userId,
      plan: parameter.item_details.name,
      price: parameter.item_details.price,
    };
    const requestDB = await Order.create(payload);
  } catch (error) {
    return Promise.reject(error.message);
  }
};

module.exports = async ({ package = "weekly", customer }) => {
  let parameter = {
    transaction_details: {
      order_id: listPackage[package].name + "-" + Date.now(),
      gross_amount: listPackage[package].price,
    },
    credit_card: {
      secure: true,
    },
    customer_details: customer,
    item_details: listPackage[package],
  };
  try {
    const transaction = await snap.createTransaction(parameter);
    await createOrder(parameter);
    return transaction;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
