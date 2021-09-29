const {
  StoreTransaction,
  CartTemp,
  Cart,
  Sequelize: { Op },
  sequelize,
} = require("../../models");
const { estimateCost } = require("../../services/rajaongkir.service");
const { getAddressItem } = require("./cart/getCostEstimation.cartController");
const { body } = require("express-validator");
const service = async function (req, res, next) {
  try {
    const listProduct = req.body.product;
    const { detail, address } = await getAddressItem(req.auth.id, listProduct);
    if (address && detail.qty) {
      const listEstimateCost = await estimateCost(address.subdistrictId, detail.weight);
      const courierPick = listEstimateCost[req.body.courierId];
      if (!courierPick) throw new Error("Kurir tidak ditemukan");
      const courier = courierPick.service;
      const delivery = courierPick.cost;
      const qty = detail.qty;
      const total = parseInt(courierPick.cost) + parseInt(detail.subtotal);
      const payload = { weight: detail.weight, courier, qty, delivery, total, ...address };

      // TRANSACTION START
      const t = await sequelize.transaction();
      try {
        const transaction = await StoreTransaction.create(payload, { transaction: t });
        const products = await CartTemp.findAll({
          where: { userId: req.auth.id, qty: { [Op.gt]: 0 }, productId: { [Op.in]: listProduct } },
        });
        let listCart = [];
        products.map((item) => {
          listCart.push({ ...item.dataValues, storeTransactionId: transaction.id });
          item.destroy({ transaction: t });
        });
        await Cart.bulkCreate(listCart, { transaction: t });

        await t.commit();
        res.response = { msg: "silahkan lanjutkan pembayaran" };
      } catch (error) {
        res.response = { status: 404, msg: error.message };
        await t.rollback();
      }
    } else if (address && !detail.qty) {
      res.response = { status: 404, msg: "keranjang sedang kosong" };
    } else {
      res.response = { status: 404, msg: "silahkan mengisi alamat terlebih dahulu" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const validation = [
  body("courierId", "Kurir tidak boleh kosong").notEmpty(),
  body("product", "produk tidak boleh kosong").notEmpty().isLength({ min: 1 }),
];

module.exports = { service, validation };
