const midtransClient = require("midtrans-client");
const { v4: uuidv4 } = require("uuid");
const {
  Order,
  OrderDetails,
  OrderDelivery,
  sequelize,
} = require("../../models");
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_ENV == "production" ? true : false,
  serverKey:
    process.env.MIDTRANS_ENV == "production"
      ? process.env.MIDTRANS_KEY
      : process.env.MIDTRANS_KEY_DEV,
});

const setupItemDetail = (listCart) => {
  let subtotal = 0;
  let weight = 0;
  let qty = 0;
  let courierCost = 0;
  let courier = null;
  let list = listCart.map((item) => {
    if (item.type == "product" || item.type == "subscription") {
      item = item.dataValues;
    }
    if (item.type == "ongkir") {
      courierCost = item.total;
      courier = item;
    } else {
      subtotal += parseInt(item.total);
    }
    if (item.type == "product") {
      qty += parseInt(item.qty);
      weight += parseInt(item.weight);
    }
    return {
      id: item.id,
      productId: item.productId,
      name: (item.type == "subscription" ? "[Subscription]" : "") + item.name,
      price: item.price,
      quantity: item.qty,
      capacity: item.weight || 0,
      total: item.total,
      type: item.type,
      img: item.img,
      note: item.note,
    };
  });
  const total = subtotal + parseInt(courierCost);
  const data = { list, weight, qty, subtotal, total, courier };
  return data;
};
const createOrder = async (payload, listCart, dataOrderDelivery) => {
  listCart = listCart.map((item) => {
    item.id = uuidv4();
    return item;
  });
  payload.details = listCart;
  if (dataOrderDelivery.addressId) {
    payload.OrderDelivery = dataOrderDelivery;
    const requestDB = await Order.create(payload, {
      include: [
        { model: OrderDetails, as: "details" },
        { model: OrderDelivery },
      ],
    });
    return requestDB;
  } else {
    const requestDB = await Order.create(payload, {
      include: [{ model: OrderDetails, as: "details" }],
    });
    return requestDB;
  }
};
module.exports = async (code, user, listCart, address = null) => {
  const { list, weight, qty, subtotal, total, courier } =
    setupItemDetail(listCart);
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
  const requestMidtrans = await snap.createTransaction(parameter);
  const dataOrder = {
    code: code,
    userId: user.id,
    price: total,
    type: address ? "store" : "subscription",
    token: requestMidtrans.token,
    url: requestMidtrans.redirect_url,
  };
  const dataOrderDelivery = {
    ...address,
    addressId: address && address.addressId,
    id: uuidv4(),
    weight: weight,
    courier: (courier && courier.service) || 0,
    qty,
    subtotal,
    delivery: (courier && courier.total) || 0,
    total,
  };
  const createOrders = await createOrder(dataOrder, list, dataOrderDelivery);
  return { requestMidtrans, createOrders };
};
