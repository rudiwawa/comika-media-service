const {
  Order,
  orderDetails,
  OrderDelivery,
  CartTemp,
  Cart,
  Product,
  Sequelize: { Op },
  sequelize,
} = require("../../models");
const { estimateCost } = require("../../services/rajaongkir.service");
const { getAddressItem } = require("./cart/getCostEstimation.cartController");
const midtransSnapUi = require("./midtransSnap.service");
const { body, query } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const service = async function (req, res, next) {
  try {
    const arrCartTemp = req.query.product;
    const { detail, address } = await getAddressItem(req.auth.id, arrCartTemp);
    if (address && detail.qty) {
      const listEstimateCost = await estimateCost(address.subdistrictId, detail.weight);
      const courier = listEstimateCost[req.body.courierId];
      if (!courier) throw new Error("Kurir tidak ditemukan");
      const listItem = await CartTemp.scope("cart").findAll({
        where: { userId: req.auth.id, id: { [Op.in]: arrCartTemp } },
      });
      if (!listItem.length) {
        res.response = { status: 404, msg: "Keranjang sedang kosong" };
      } else {
        res.response = await transactionHandler({ user: req.auth, address, courier, items: listItem, arrCartTemp });
      }
    } else if (address && !detail.qty) {
      res.response = { status: 400, msg: "keranjang sedang kosong" };
    } else {
      res.response = { status: 400, msg: "silahkan mengisi alamat terlebih dahulu" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

// TRANSACTION START
const transactionHandler = async ({ user, address, courier, items, arrCartTemp }) => {
  const t = await sequelize.transaction();
  try {
    const code = generateCode(user.name, courier.service, address.subdistrict);
    const requestMidtrans = await midtransSnapUi({ user, items, address, code, courier });
    CartTemp.destroy({ where: { id: { [Op.in]: arrCartTemp } } });
    return { msg: "silahkan lanjutkan pembayaran", data: requestMidtrans };
  } catch (error) {
    await t.rollback();
    return { status: 500, msg: error.message };
  }
};

const generateCode = (name, courier, subdistrict) => {
  const timestamp = "" + Date.now();
  const parseName = aiueo(name.split(" ")[0]);
  const parseCourier = aiueo(courier);
  const parseSubdistrict = aiueo(subdistrict);
  const code =
    parseCourier +
    timestamp.substr(6, 9) +
    "-" +
    parseName +
    timestamp.substr(0, 6) +
    "-" +
    parseSubdistrict +
    timestamp.substr(9);
  return code;
};

const validation = [
  body("courierId", "Kurir tidak boleh kosong").notEmpty(),
  query("product", "produk tidak boleh kosong").notEmpty().isLength({ min: 1 }),
];

const aiueo = (val) => val.replace(/[ \a\i\u\o\e]/gi, "").toUpperCase();

module.exports = { service, validation };
