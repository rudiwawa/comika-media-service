const { User } = require("../../../models");
const { body } = require("express-validator");
const service = async function (req, res, next) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const requestDB = await User.create(payload);
    res.response = { msg: "akun berhasil didaftarkan", data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
const validation = [
  body("name", "nama tidak boleh kosong").notEmpty(),
  body("email", "email tidak boleh kosong")
    .notEmpty()
    .isEmail()
    .withMessage("email tidak valid")
    .custom(async (value) => {
      const user = await User.findOne({
        where: { email: value, role: "user" },
      });
      if (user) {
        return Promise.reject("E-mail already in use");
      } else {
        return true;
      }
    }),
  body("password", "password tidak boleh kosong").notEmpty(),
];
module.exports = { service, validation };
