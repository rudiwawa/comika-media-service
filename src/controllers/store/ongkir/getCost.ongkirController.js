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
    const where = { userId: req.auth.id, qty: { [Op.gt]: 0 }, productId: { [Op.in]: req.body.product } };
    const product = await CartTemp.findOne({
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("qty")), "qty"],
        [Sequelize.fn("sum", Sequelize.col("weight")), "weight"],
        [Sequelize.fn("sum", Sequelize.col("total")), "subtotal"],
      ],
      where,
    });
    const detail = product.dataValues;
    const address = await getActive(req.auth.id);
    const payload = {
      weight: detail.weight,
      destination: address.subdistrictId,
    };
    detail.subtotalRp = setRupiah(detail.subtotal);
    detail.destination = {
      id: address.id,
      name: address.name,
      phone: address.phone,
      address: address.address,
    };
    const estimateDelivery = await estimateCost(payload);
    res.response = { etc: { detail, estimateDelivery } };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
