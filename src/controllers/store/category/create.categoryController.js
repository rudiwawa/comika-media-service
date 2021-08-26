const { Category } = require("../../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      type: req.body.type,
    };
    const requestDB = await Category.create(payload);
    res.response = { msg: `Kategori berhasil ditambahkan`, data: requestDB };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

const validation = [
  body("name", "nama kategori tidak boleh kosong")
    .notEmpty()
    .custom((value) => {
      return Category.findOne({ where: { name: value } }).then((category) => {
        if (category) {
          return Promise.reject("nama kategori item sudah digunakan");
        }
      });
    }),
  body("type", "kategori tidak boleh kosong")
    .notEmpty()
    .isIn(["physical", "electronic", "redirect"])
    .withMessage("tipe kategori tidak sesuai"),
];

module.exports = { service, validation };
