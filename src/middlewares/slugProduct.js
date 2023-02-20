const { Product, Source, Category, Record, sequelize, Sequelize } = require("../models");
const moment = require("moment");
module.exports = async function (req, res, next) {
  try {
    const where = {
      publishedAt: {
        [Sequelize.Op.lte]: moment().add(7, "hours"),
      },
      availableTo: {
        [Sequelize.Op.gte]: moment().add(7, "hours"),
      },
    };
    if (req.params.slug) where.slug = req.params.slug;
    if (req.params.id) where.id = req.params.id;
    const requestDB = await Product.scope("product").findAll({
      attributes: {
        exclude: ["CategoryId", "sequence", "isPublish", "availableTo"],
      },
      where,
    });

    if (!requestDB.length) {
      req.record.status = 404;
      req.record.msg = `Produk tidak ditemukan`;
      Record.create(req.record);
      return res.status(404).json({ msg: `Produk tidak ditemukan` });
    } else {
      req.product = requestDB[0];
      next();
    }
  } catch (error) {
    req.record.status = 500;
    req.record.msg = error.message;
    Record.create(req.record);
    return res.status(500).json({ msg: error.message });
  }
};
