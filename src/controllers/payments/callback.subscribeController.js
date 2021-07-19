const { Subscription, Transaction, Order } = require("../../models");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const service = async function (req, res, next) {
  try {
    const body = req.body;
    const payload = {
      trId: body.transaction_id,
      status: body.transaction_status,
      code: body.status_code,
      paymentType: body.payment_type,
      orderId: body.order_id,
      grossAmount: body.grass_amount,
      currency: body.currency,
    };
    if (req.body.status_code == 200) {
      successTransaction(payload);
    } else {
      recordTransaction(payload);
      res.response = { msg: "successfull record pending" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const recordTransaction = async (payload) => {
  try {
    const requestDB = await Transaction.create(payload);
  } catch (error) {
    return new Promise.reject(error);
  }
};

const successTransaction = async (payload) => {
  recordTransaction(payload);
  const myOrder = await findOrder(payload.orderId);
  const subscriptionActive = generateActivation(myOrder.plan, myOrder.userId);
  const requestDB = await Subscription.bulkCreate(subscriptionActive);
  res.response = { msg: `${myOrder.plan} plan berhasil diaktifkan`, data: requestDB };
};

const findOrder = async (orderId) => {
  try {
    const myOrder = await Order.findOne({ where: { id: orderId } });
    if (myOrder) return myOrder;
    else return new Promise.reject("order not found");
  } catch (error) {
    return new Promise.reject(error.message);
  }
};

const generateActivation = (plan, authId) => {
  switch (plan) {
    case "YEARLY":
      return setAvalaibleOn(authId, 365);
    case "MONTHLY":
      return setAvalaibleOn(authId, 30);
    case "WEEKLY":
      return setAvalaibleOn(authId, 7);
    default:
      return setAvalaibleOn(authId, 0);
  }
};

const setAvalaibleOn = (userId, day = 0) => {
  const setPayload = [];
  for (let index = 0; index < day; index++) {
    setPayload.push({
      id: uuidv4(),
      userId,
      availableOn: moment().add(index, "days"),
    });
  }
  return setPayload;
};
module.exports = { service };
