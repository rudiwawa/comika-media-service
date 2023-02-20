const {
  CartTemp,
  Sequelize,
  Sequelize: { Op },
} = require("../../../models");
const { body } = require("express-validator");
const { estimateCost } = require("../../../services/rajaongkir.service");
const { setRupiah } = require("../../../helpers/currency");
const { getActive } = require("../../users/address/activeAddress.service");

const service = async function (req, res, next) {
  try {
    let listProduct = req.query.product;
    if (typeof listProduct === "string") {
      listProduct = [listProduct];
    }
    if (!listProduct) {
      return res.status(400).json({ msg: "kerenjang produk tidak boleh kosong" });
    }
    const { detail, address } = await getAddressItem(req.auth.id, listProduct);
    const estimateDelivery = await estimateCost(address.subdistrictId, detail.weight);
    res.response = { etc: { detail, address, estimateDelivery } };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const getAddressItem = async (userId, listProduct = []) => {
  let [address, product] = await Promise.all([
    getActive(userId),
    CartTemp.scope("summary").findOne({
      where: { qty: { [Op.gt]: 0 }, id: { [Op.in]: listProduct } },
      group: ["user_id"],
    }),
  ]);
  if (!product) {
    throw new Error("Produk tidak ditemukan dalam keranjang");
  }
  const detail = product.dataValues;
  address = address.dataValues;
  address.addressId = address.id;
  delete address.id;
  detail.subtotalRp = setRupiah(detail.subtotal);
  return { detail, address };
};

module.exports = { service, getAddressItem };
