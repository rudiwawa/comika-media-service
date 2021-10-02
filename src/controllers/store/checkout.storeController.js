const {
  StoreTransaction,
  CartTemp,
  Cart,
  Sequelize: { Op },
  sequelize,
} = require("../../models");
const { estimateCost } = require("../../services/rajaongkir.service");
const { getAddressItem } = require("./cart/getCostEstimation.cartController");
const midtransSnapUi = require("./midtransSnap.service");
const { body } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const service = async function (req, res, next) {
  try {
    const listProduct = req.body.product;
    const { detail, address } = await getAddressItem(req.auth.id, listProduct);
    if (address && detail.qty) {
      const listEstimateCost = await estimateCost(address.subdistrictId, detail.weight);
      const courier = listEstimateCost[req.body.courierId];
      if (!courier) throw new Error("Kurir tidak ditemukan");
      const payload = {
        weight: detail.weight,
        qty: detail.qty,
        subtotal: detail.subtotal,
        ...address,
      };
      res.response = await transactionHandler(req.auth, payload, courier, listProduct);
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
const transactionHandler = async (user, payload, courier, listProduct) => {
  const t = await sequelize.transaction();
  try {
    payload.courier = courier.service;
    payload.delivery = courier.cost;
    payload.total = parseInt(courier.cost) + parseInt(payload.subtotal);
    const transaction = await StoreTransaction.create(payload, { transaction: t });
    const products = await CartTemp.findAll({
      where: { userId: user.id, qty: { [Op.gt]: 0 }, id: { [Op.in]: listProduct } },
    });
    if (!products.length) {
      return { status: 404, msg: "Keranjang sedang kosong" };
    }
    let listCart = products.map((item) => {
      item.destroy({ transaction: t });
      return {
        quantity: item.dataValues.qty,
        type: "product",
        storeTransactionId: transaction.id,
        ...item.dataValues,
      };
    });
    listCart.push({
      id: uuidv4(),
      name: courier.service,
      quantity: 1,
      price: courier.cost,
      type: "ongkir",
    });
    const data = await Cart.bulkCreate(listCart, { transaction: t });
    const requestMidtrans = await getSnapUi(transaction.code, user, listCart, payload.total);
    // await t.commit();
    return { msg: "silahkan lanjutkan pembayaran", data: requestMidtrans };
  } catch (error) {
    await t.rollback();
    return { status: 500, msg: error.message };
  }
};

const getSnapUi = async (transactionCode, customer, items, total) => {
  return await midtransSnapUi({ customer, items, total, transactionCode });
};

const validation = [
  body("courierId", "Kurir tidak boleh kosong").notEmpty(),
  body("product", "produk tidak boleh kosong").notEmpty().isLength({ min: 1 }),
];

module.exports = { service, validation };
