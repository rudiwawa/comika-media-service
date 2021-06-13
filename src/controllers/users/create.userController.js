const { User, Role } = require("../../models");
const sendEmail = require("../../services/sendEmail");
const { body } = require("express-validator");

const service = async (req, res, next) => {
  const body = req.body;
  const payload = {
    name: body.name,
    email: body.email,
    password: body.password,
    Roles: [
      {
        role: body.role,
      },
    ],
  };

  try {
    const requestDB = await User.create(payload, { include: Role });
    req.response = {
      msg: `data ${body.name} berhasil ditambahkan.`,
      data: requestDB,
    };
    // sendEmail({ to: req.body.email });
  } catch (err) {
    req.response = { status: 500, msg: err.message };
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
];
module.exports = { service, validation };
