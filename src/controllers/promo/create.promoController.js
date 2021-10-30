const { Promo } = require("../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  try {
    const payload = req.body;
    delete payload.id;
    const requestDB = await Promo.create(payload);
    res.response = { msg: "promo berhasil disimpan", data: requestDB };
  } catch (error) {
    res.response = { msg: error.toString(), status: 500 };
  }
  next();
};

const validation = [
  body("code", "kode tidak boleh kosong")
    .notEmpty()
    .custom((value) => {
      return Promo.findOne({ where: { code: value } }).then((promo) => {
        if (promo) return Promise.reject("Kode promo sudah ada");
      });
    }),
  body("discount", "diskon tidak boleh kosong")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("diskon tidak boleh bernilai negatif"),
];

module.exports = { service, validation };
