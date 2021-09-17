const {
  CartTemp,
  Sequelize: { Op },
} = require("../../../models");

const service = async (req, res, next) => {
  try {
    const where = { userId: req.auth.id, qty: { [Op.gt]: 0 } };
    const requestDB = await CartTemp.findAll({ where });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
