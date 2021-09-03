const { Product, Source, Category, Record, sequelize, Sequelize } = require("../models");
const moment = require("moment");
module.exports = async function (req, res, next) {
  try {
    const where = {
      slug: req.params.slug,
      publishedAt: {
        [Sequelize.Op.lte]: moment().add(7, "hours"),
      },
    };
    const requestDB = await Product.scope("public").findAll({
      include: [
        { attributes: ["id", "name", "type"], model: Category },
        { attributes: ["id", "url", "name"], model: Source, as: "images" },
      ],
      where,
    });
    if (!requestDB) {
      req.record.status = 404;
      req.record.msg = `Produk ${req.params.slug} tidak ditemukan`;
      Record.create(req.record);
      return res.status(404).json({ msg: `Produk ${req.params.slug} tidak ditemukan` });
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
