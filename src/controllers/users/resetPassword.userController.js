const { User, ResetPassword } = require("../../models");
const sendEmail = require("../../services/sendEmail");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  const where = {
    email: req.params.email,
    role: "user",
  };
  try {
    const user = await User.findOne({ where });
    if (user) {
      await ResetPassword.destroy({
        where: { userId: user.dataValues.id },
      });
      const requestDB = await ResetPassword.create({
        userId: user.dataValues.id,
      });
      const code = requestDB.dataValues.id;
      const emailReceiver = user.dataValues.email;
      const isEmailSuccess = await createEmail(code, emailReceiver);
      if (isEmailSuccess)
        res.response = {
          msg: "silahkan cek email untuk reset password.",
        };
      else
        res.response = {
          status: 400,
          msg: "TETOOOT",
        };
    } else {
      res.response = { status: 404, msg: "email tidak terdaftar." };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const setResetPassword = async function (req, res, next) {
  try {
    ResetPassword.destroy({ where: { id: req.body.token } });
    const requestDB = await User.update({ password: req.body.password }, { where: { id: req.body.userId } });
    if (requestDB) {
      res.response = { msg: "password berhasil diperbarui" };
    } else {
      res.response = {
        status: 400,
        msg: "pastikan link reset password kamu benar.",
      };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const validationReset = [
  body("token", "token tidak boleh kosong")
    .notEmpty()
    .custom(async (value, { req }) => {
      try {
        const token = await ResetPassword.findOne({
          where: { id: value, revoke: false },
        });
        if (token) {
          req.body.userId = token.dataValues.userId;
        } else {
          throw new Error("pastikan link reset password kamu benar.");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  body("password", "password tidak boleh kosong")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("password minimal 8 karakter"),
  body("passwordConfirmation", "password konfirmasi tidak boleh kosong")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password konfirmasi tidak cocok");
      }
      return true;
    }),
];

const createEmail = async (code, emailReceiver) => {
  const linkReset = process.env.WEB_FE + `/jangan_lupa_lagi/${code}`;
  const body = `Silahkan klik <a href="${linkReset}">link berikut</a> untuk melakukan reset password atau kunjungi ${linkReset}`;
  const subject = "Reset Password";
  return sendEmail({ to: emailReceiver, subject, body });
};

module.exports = { service, validationReset, setResetPassword };
