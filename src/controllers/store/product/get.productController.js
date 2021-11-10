const { Product } = require("../../../models");
const service = async function (req, res, next) {
  try {
    const where = { type: "product" };
    const requestDB = await Product.findAll({
      where,
      order: [["createdAt", "desc"]],
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };
