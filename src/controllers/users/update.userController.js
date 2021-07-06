const {
  User,
  Sequelize: { Op },
} = require("../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  const body = req.body;
  const payload = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    birthdate: body.birthdate,
    address: body.address,
    postalCode: body.postalCode,
    district: body.district,
    city: body.city,
    province: body.province,
    role: body.role,
  };
  if (req.file) payload.photo = req.urlApps + req.file.path;
  try {
    const requestDB = await User.update(payload, {
      where: { id: body.id },
    });
    if (requestDB[0]) {
      res.response = {
        msg: `data ${body.name} berhasil diperbarui`,
        data: payload,
      };
    } else {
      res.response = {
        status: 400,
        msg: `data ${body.name} gagal untuk diperbarui`,
      };
    }
  } catch (err) {
    res.response = { status: 500, msg: err.message };
  }
  next();
};

const validation = [
  body("id").notEmpty().withMessage("id tidak boleh kosong"),
  body("name").notEmpty().withMessage("name tidak boleh kosong"),
  body("phone").isLength({ max: 13 }).withMessage("nomor telepon maksimal 13 karakter"),
  body("postalCode").isLength({ max: 5 }).withMessage("kode pos tidak boleh lebih 5 karakter"),
  body("email")
    .notEmpty()
    .withMessage("email tida boleh kosong")
    .isEmail()
    .withMessage("email tidak valid"),
  body().custom(({ id, email }) => {
    return User.findAll({
      where: { [Op.and]: [{ email }, { id: { [Op.ne]: id } }] },
    }).then((user) => {
      if (user.length) {
        return Promise.reject("email sudah digunakan");
      }
    });
  }),
];
module.exports = { service, validation };
