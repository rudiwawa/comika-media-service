const midtransClient = require("midtrans-client");
const { v4: uuidv4 } = require("uuid");
const { Order, OrderDetails, OrderDelivery, sequelize } = require("../../models");
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_ENV == "production" ? true : false,
  serverKey: process.env.MIDTRANS_ENV == "production" ? process.env.MIDTRANS_KEY : process.env.MIDTRANS_KEY_DEV,
});

const setupItemDetail = (items, courier) => {
  let subtotal = 0;
  let weight = 0;
  let qty = 0;
  let list = items.map((item) => {
    item = item.dataValues;
    subtotal += parseInt(item.total);
    weight += parseInt(item.weight);
    qty += parseInt(item.qty);
    return {
      id: item.id,
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
      capacity: item.weight,
      total: item.total,
      type: "product",
      img: item.img,
    };
  });
  list.push({
    id: "ongkir",
    productId: "ongkir",
    type: "ongkir",
    name: `ONGKIR ${courier.fromTo}`,
    quantity: 1,
    price: courier.cost,
    capacity: 0,
    total: courier.cost,
    img: "gambar ongkir",
  });
  return { list, weight, qty, subtotal, total: subtotal + parseInt(courier.cost) };
};
const createOrder = async (payload, items, dataOrderDelivery) => {
  try {
    const t = await sequelize.transaction();
    items = items.map((item) => {
      item.id = uuidv4();
      return item;
    });
    payload.details = items;
    payload.OrderDelivery = dataOrderDelivery;
    const requestDB = await Order.create(payload, {
      include: [{ model: OrderDetails, as: "details" }, { model: OrderDelivery }],
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
};
module.exports = async ({ code, user, items, courier, address }) => {
  try {
    const { list, weight, qty, subtotal, total } = setupItemDetail(items, courier);
    let parameter = {
      transaction_details: {
        order_id: code,
        gross_amount: total,
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
      item_details: list,
    };
    const transaction = await snap.createTransaction(parameter);
    const dataOrder = {
      code: code,
      userId: user.id,
      price: total,
      type: "store",
      token: transaction.token,
      url: transaction.redirect_url,
    };
    const dataOrderDelivery = {
      ...address,
      addressId: address.addressId,
      id: uuidv4(),
      weight: weight,
      courier: courier.service,
      qty,
      subtotal,
      delivery: courier.cost,
      total,
    };
    createOrder(dataOrder, list, dataOrderDelivery);
    return transaction;
  } catch (error) {
    throw new Error(error.message);
  }
};
