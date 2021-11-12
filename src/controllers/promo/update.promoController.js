const {
  Product,
  Sequelize: { Op },
} = require("../../models");
const { body } = require("express-validator");
const moment = require("moment");

const service = async function (req, res, next) {
  try {
    const { body } = req;
    const where = { id: body.id };
    const payload = {
      name: body.name,
      type: "discount",
      slug: body.code,
      category: body.category,
      description: body.description,
      price: body.price,
      capacity: 999,
      sequnce: 0,
      isPublish: body.isPublish,
      publishedAt: body.publishedAt,
      availableTo: body.availableTo,
    };
    const requestDB = await Product.update(payload, { where });
    res.response = { msg: "promo berhasil disimpan", data: requestDB };
  } catch (error) {
    res.response = { msg: error.toString(), status: 500 };
  }
  next();
};

const validation = [
  body("id", "id tidak boleh kosong").notEmpty(),
  body("name", "nama produk tidak boleh kosong").notEmpty(),
  body("code", "kode tidak boleh kosong")
    .notEmpty()
    .custom((value, { req }) => {
      return Product.scope("promoActive")
        .findOne({ where: { slug: value, type: "discount", id: { [Op.ne]: req.body.id } } })
        .then((promo) => {
          if (promo) {
            return Promise.reject("kode promo sudah digunakan");
          }
        });
    }),
  body("price", "Discount tidak boleh kosong")
    .notEmpty()
    .custom((value, { req }) => {
      if (req.body.category == "Percent") {
        if (value > 100) throw new Error("Persentase tidak boleh lebih dari 100%");
      }
      return true;
    })
    .isInt({ min: 0 })
    .withMessage("diskon tidak boleh kurang dari 0"),
  body("description", "deskripsi produk tidak boleh kosong").notEmpty(),
  body("category", "kategori tidak boleh kosong").notEmpty().isIn(["Nominal", "Percent"]),
  body("publishedAt", "waktu aktif promo wajib diisi").notEmpty(),
  body("availableTo", "waktu batas promo wajib diisi")
    .notEmpty()
    .custom((value, { req }) => {
      const diff = moment(value).diff(moment(req.body.publishedAt));
      if (diff < 0) throw new Error("waktu batas promo harus lebih besar dari waktu aktif");
      return true;
    }),
];

module.exports = { service, validation };
