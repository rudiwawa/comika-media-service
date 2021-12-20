const { User, Role } = require("../../models");
const sendEmail = require("../../services/sendEmail");
const { body } = require("express-validator");

const service = async (req, res, next) => {
  const body = req.body;
  const payload = {
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
    phone: body.phone,
    address: body.address,
    postalCode: body.postalCode,
    district: body.district,
    city: body.city,
    province: body.province,
  };

  try {
    const requestDB = await User.create(payload);
    res.response = {
      msg: `data ${body.name} berhasil ditambahkan.`,
      data: requestDB,
    };
    // sendEmail({ to: req.body.email, html: greeting(body.name, body.role) });
  } catch (err) {
    res.response = { status: 500, msg: err.message };
  }
  next();
};

const validation = [
  body("name").notEmpty().withMessage("nama wajib diisi"),
  body("email")
    .isEmail()
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("Email sudah digunakan");
        }
      });
    }),
  body("phone", "phone tidak boleh kosong")
    .notEmpty()
    .isLength({ min: 10, max: 13 })
    .withMessage("phone minimal 12 dan maksimal 13 karakter"),
  body("role").isIn(["admin", "writer", "user"]).withMessage("role tidak sesuai"),
];

const greeting = (name, role) => {
  return `Selamat bergabung <b>${name}</b>, sebagai <b>${role}</b> di Comika Media.`;
};
module.exports = { service, validation };
