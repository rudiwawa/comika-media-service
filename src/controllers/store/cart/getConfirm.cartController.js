const {
  CartTemp,
  Sequelize: { Op },
} = require("../../../models");

const service = async (req, res, next) => {
  try {
    let listProduct = req.query.product;
    if (typeof listProduct === "string") {
      listProduct = [listProduct];
    }
    if (!listProduct) {
      return res.status(400).json({ msg: "kerenjang produk tidak boleh kosong" });
    }
    const where = { userId: req.auth.id, qty: { [Op.gt]: 0 }, id: { [Op.in]: listProduct } };
    const requestDB = await CartTemp.scope("cart").findAll({ where });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
