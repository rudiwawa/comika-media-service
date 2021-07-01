const MidtransService = require("./midtrans.service");
const { body } = require("express-validator");
const createInvoice = async function (req, res, next) {
  try {
    const user = req.auth;
    const customerDetails = {
      first_name: user.name,
      email: user.email,
      phone: user.phone,
    };
    const responseMidtrans = await MidtransService({
      customerDetails,
      method: req.body.method,
      package: req.body.package,
    });
    res.response = { data: responseMidtrans };
  } catch (error) {
    res.response = { status: error.httpStatusCode, msg: error.ApiResponse };
    req.record.msg = error.message;
  }
  next();
};
const validation = [
  body("method").notEmpty().withMessage("silahkan pilih metode pembayaran terlebih dahulu"),
  body("package")
    .notEmpty()
    .withMessage("silahkan pilih subscription plan terlebih dahulu")
    .isIn(["weekly", "monthly", "yearly"])
    .withMessage("paket harus sesuai dengan yang tersedia"),
];
module.exports = { service: createInvoice, validation };
