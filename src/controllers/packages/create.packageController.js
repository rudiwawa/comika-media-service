const { Package } = require("../../models");
const { body } = require("express-validator");
const service = async function (req, res, next) {
  const payload = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const requestDB = await Package.create(payload);
    res.response = { msg: "Paket berhasil dibuat", data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
const validation = [
  body("name")
    .notEmpty()
    .withMessage("nama paket tidak boleh kosong")
    .custom(async (value) => {
      return Package.findOne({ where: { name: value } }).then((response) => {
        if (response) return new Promise.reject("Nama paket sudah digunakan");
      });
    }),
  body("longTime").isInt({ min: 1 }).withMessage("lama waktu minimal 1 hari"),
  body("price", "harga harus berupa angka")
    .isInt({ min: 0 })
    .withMessage("harga tidak boleh kurang dari 0"),
];

module.exports = { service, validation };
