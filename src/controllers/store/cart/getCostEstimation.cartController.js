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
    const { detail, address } = await getAddressItem(req.auth.id, req.body.product);
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
    CartTemp.findOne({
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("qty")), "qty"],
        [Sequelize.fn("sum", Sequelize.col("weight")), "weight"],
        [Sequelize.fn("sum", Sequelize.col("total")), "subtotal"],
      ],
      where: { userId, qty: { [Op.gt]: 0 }, id: { [Op.in]: listProduct } },
    }),
  ]);
  const detail = product.dataValues;
  address = address.dataValues;
  address.addressId = address.id;
  delete address.id;
  detail.subtotalRp = setRupiah(detail.subtotal);
  return { detail, address };
};

module.exports = { service, getAddressItem };
