const {
  Category,
  Sequelize: { Op },
} = require("../../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      categoryId: req.body.categoryId,
    };
    const requestDB = await Category.update(payload, { where: { id: req.body.id } });
    res.response = { msg: `Kategori berhasil diubah` };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

const validation = [
  body("name", "nama kategori tidak boleh kosong").notEmpty(),
  body().custom((body) => {
    return Category.findOne({
      where: {
        name: body.name,
        id: {
          [Op.ne]: body.id,
        },
      },
    }).then((category) => {
      if (category) {
        return Promise.reject("nama kategori item sudah digunakan");
      }
    });
  }),
  body("type", "kategori tidak boleh kosong")
    .notEmpty()
    .isIn(["physical", "electronic", "redirect"])
    .withMessage("tipe kategori tidak sesuai"),
  body("id", "id tidak boleh kosong").notEmpty(),
];

module.exports = { service, validation };
