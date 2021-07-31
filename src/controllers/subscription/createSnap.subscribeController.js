const { body } = require("express-validator");
const midtransSnapUi = require("./midtransSnap.service");

const service = async function (req, res, next) {
  try {
    const user = req.auth;
    const customerDetails = {
      userId: user.id,
      first_name: user.name,
      email: user.email,
      phone: user.phone,
    };
    const requestMidtrans = await midtransSnapUi({
      package: req.body.package,
      customer: customerDetails,
    });
    res.response = { data: requestMidtrans };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const validation = [
  body("package")
    .notEmpty()
    .withMessage("silahkan pilih subscription plan terlebih dahulu")
    .isIn(["weekly", "monthly", "yearly"])
    .withMessage("paket harus sesuai dengan yang tersedia"),
];
module.exports = { service, validation };
