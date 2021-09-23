const {
  Package,
  Sequelize: { Op },
} = require("../../models");
const { body } = require("express-validator");
const moment = require("moment");
const service = async function (req, res, next) {
  const { body } = req;
  const payload = {
    name: body.name,
    price: body.price,
    longTime: body.longTime,
    description: body.description,
    publishedAt: body.publishedAt,
    availableTo: body.availableTo,
  };
  try {
    const requestDB = await Package.update(payload, { where: { id: body.id } });
    res.response = { msg: "Paket berhasil diperbarui", data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
const validation = [
  body("id").notEmpty("id tidak boleh kosong"),
  body("name").notEmpty().withMessage("nama paket tidak boleh kosong"),
  body("code").custom(async (value, { req }) => {
    return Package.findOne({ where: { code: value, id: { [Op.ne]: req.body.id } } }).then((response) => {
      if (response) return new Promise.reject("Kode paket sudah digunakan");
    });
  }),
  body("longTime", "lama waktu tidak boleh kosong")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("lama waktu minimal 1 hari"),
  body("description", "deskripsi tidak boleh kosong").notEmpty(),
  body("price", "harga tidak boleh kosong")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("harga tidak boleh kurang dari Rp 1"),
  body("publishedAt", "jadwal publish tidak boleh kosong").notEmpty(),
  body("availableTo", "batas publish tidak boleh kosong")
    .notEmpty()
    .custom((value, { req }) => {
      if (moment(value).diff(moment(req.body.publishedAt)) > 0) {
        throw new Error("batas publish harus lebih besar dari pada jadwal publish");
      }
      return true;
    }),
];

module.exports = { service, validation };
