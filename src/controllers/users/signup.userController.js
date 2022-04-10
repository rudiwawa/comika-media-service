const { User, Register } = require("../../models");
const { body } = require("express-validator");
const sendEmail = require("../../services/sendEmail");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const service = async function (req, res, next) {
  const id = uuidv4();
  const payload = {
    id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isVerified: false,
  };
  try {
    const payloadRegister = {
      id,
      token: jwt.sign({ email: req.body.email, name: req.body.name }, "SIGNUP-COMIKA-MEDIA-PRO"),
    };
    const register = await Register.create(payloadRegister);
    const userData = await User.create(payload);
    sendEmail({
      to: req.body.email,
      body: emailVerification(payload.name, payloadRegister.token),
    });
    res.response = {
      msg: "silahkan lakukan verifikasi email sebelum login",
      data: userData,
    };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const emailVerification = (name, token) => {
  const web = process.env.NODE_ENV === "production" ? "https://api.comika.media/api" : "http://localhost:3010/api";
  return `
  <p>Halo ${name}</p>
  <p>Silakan tekan tombol di bawah ini untuk melakukan verifikasi email.</p>
  <a style="color:white" href="${web}/verification/${token}" class="w-100 btn text-decoration-none">Verifikasi Email</a> <br><br> atau klik <a href="${web}/verification/${token}" class="w-100 text-decoration-none"> disini</a>. `;
};

const validation = [
  body("name", "nama tidak boleh kosong").notEmpty(),
  body("email", "email tidak boleh kosong")
    .notEmpty()
    .isEmail()
    .withMessage("email tidak valid")
    .custom(async (value) => {
      const user = await User.findOne({
        where: { email: value },
      });
      if (user) {
        if (user.isVerified) return Promise.reject("E-mail sudah digunakan");
        else return Promise.reject("Cek email dan lakukan verifikasi");
      } else {
        return true;
      }
    }),
  body("password", "password tidak boleh kosong").notEmpty(),
];
module.exports = { service, validation };
