const { Product, Category, Sequelize, Source, sequelize } = require("../../models");
const service = async function (req, res, next) {
  try {
    return res.json(req.product);
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
