const {
  CartTemp,
  Sequelize: { Op },
  sequelize,
} = require("../../models");
const { v4: uuidv4 } = require("uuid");
const { estimateCost } = require("../../services/rajaongkir.service");
const { getAddressItem } = require("./cart/getCostEstimation.cartController");
const midtransCheckout = require("./midtransCheckout.service");
const midtransSubscribe = require("../subscription/midtransSubscribe.service");
const { body, query } = require("express-validator");
const notification = require("./notification.service");
const confirmCart = require("./cart/cart.service");

const service = async function (req, res, next) {
  try {
    let listProduct = req.query.product;
    if (typeof listProduct === "string") {
      listProduct = [listProduct];
    }
    const promoCode = req.query.promo;
    const courierId = req.body.courierId;
    let check = await confirmCart(req.auth.id, listProduct, promoCode);
    if (!check.cart.length) {
      throw new Error("Keranjang sedang kosong");
    }
    if (check.showAddress) {
      const { detail, address } = await getAddressItem(req.auth.id, listProduct);
      if (address && detail.qty) {
        const listEstimateCost = await estimateCost(address.subdistrictId, detail.weight);
        const courier = listEstimateCost[courierId];
        if (!courier) {
          throw new Error("Kurir tidak ditemukan");
        }
        check.cart = addOngkirToCart(check.cart, courier);
        if (check.promo) {
          check.cart.push(check.promo);
        }
        res.response = await transactionHandler(req.auth, check.cart, address);
      } else if (address && !detail.qty) {
        res.response = { status: 400, msg: "keranjang sedang kosong" };
      } else {
        if (check.promo) {
          check.cart.push(check.promo);
        }
        res.response = { status: 400, msg: "silahkan mengisi alamat terlebih dahulu" };
      }
    } else {
      if (check.promo) {
        check.cart.push(check.promo);
      }
      res.response = await transactionHandler(req.auth, check.cart);
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const addOngkirToCart = (cart, ongkir) => {
  cart.push({
    id: uuidv4(),
    productId: "0734f6b2-6b4c-45b9-be8c-d1aaf6903373",
    qty: 1,
    img: "http://api.comika.media/uploads/comika/icon.png",
    note: null,
    type: "ongkir",
    category: "Nominal",
    name: `ONGKIR ${ongkir.fromTo}`,
    weight: 0,
    price: ongkir.cost,
    capacity: 0,
    total: ongkir.cost,
    service: ongkir.service,
  });
  return cart;
};
// TRANSACTION START
const transactionHandler = async (user, listCart, address = null) => {
  const code = generateCode(user.name);
  let listProduct = [];
  listCart.map((item) => {
    if (item.type == "product" || item.type == "subscription") listProduct.push(item.id);
  });
  const { requestMidtrans, createOrders } = await midtransCheckout(code, user, listCart, address);
  // await CartTemp.destroy({ where: { id: { [Op.in]: listProduct } } });
  console.log();
  const dataOrder = createOrders.dataValues;
  notification(user, listCart, requestMidtrans.redirect_url, dataOrder);
  return { msg: "silahkan lanjutkan pembayaran", data: requestMidtrans };
};

const generateCode = (name) => {
  const timestamp = "" + Date.now();
  const parseName = aiueo(name.split(" ")[0]);
  const code = timestamp.substr(6, 9) + parseName + timestamp.substr(0, 6) + parseName + timestamp.substr(9);
  return code;
};

const validation = [
  body("courierId", "Kurir tidak boleh kosong").notEmpty(),
  query("product", "produk tidak boleh kosong").notEmpty().isLength({ min: 1 }),
];

const aiueo = (val) => val.replace(/[ \a\i\u\o\e]/gi, "").toUpperCase();

module.exports = { service, validation };
