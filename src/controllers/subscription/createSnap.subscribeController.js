const { body } = require("express-validator");
const { User, Package } = require("../../models");
const midtransSnapUi = require("./midtransSnap.service");
const sendEmail = require("../../services/sendEmail");

const service = async function (req, res, next) {
  try {
    const requestData = await User.findOne({ where: { id: req.auth.id } });
    const user = requestData.dataValues;
    if (!isProfileComplete(user)) {
      res.response = {
        status: 400,
        msg: "silahkan lengkapi data profile terlebih dahulu",
        data: { redirect_url: process.env.WEB_FE + "/setting/profile" },
      };
    } else {
      // throw new Error("API UNDER MAINTENANCE");
      // const user=requestData
      // return res.json(req.subscription);
      const customerDetails = {
        userId: user.id,
        first_name: user.name,
        email: user.email,
        phone: user.phone,
      };
      const requestMidtrans = await midtransSnapUi({
        package: req.subscription,
        customer: customerDetails,
      });
      res.response = { msg: `${req.auth.name} membeli paket subscription`, data: requestMidtrans };
      sendEmail({ to: user.email, subject: "SUBSCRIBE", body: bodyEmail(user.name, requestMidtrans.redirect_url) });
    }
  } catch (error) {
    res.response = { status: 500, msg: error.toString() };
  }
  next();
};

const isProfileComplete = (auth) => {
  if (
    !auth.name ||
    !auth.email ||
    !auth.phone ||
    !auth.birthdate ||
    !auth.address ||
    !auth.postalCode ||
    !auth.subdistrict ||
    !auth.city ||
    !auth.province
  ) {
    return false;
  } else return true;
};

const bodyEmail = (name, link) => {
  return `<p>Hai ${name}, Selesaikan pembayaran untuk aktivasi sebagai member PREMIUM Comika Media dengan klik link berikut</p>
  <center style="margin-top: 30px;">
      <a href="${link}" class="card" style="padding:20px 50px">KLIK DISINI</a>
      <br>
      <br>
      <div>ATAU</div>
      <a href="${link}">${link}</a>
  </center>`;
};

const validation = [
  body("package")
    .notEmpty()
    .withMessage("silahkan pilih subscription plan terlebih dahulu")
    .custom(async (value, { req }) => {
      value =
        value == "weekly"
          ? "3d4d4d47-a2f3-48a7-a3b2-0a2e910038e5"
          : value == "monthly"
          ? "3d4d4d47-a2f3-49a7-a3b2-0a2e910038e5"
          : value == "yearly"
          ? "3d4d4d47-a2f3-48a7-a3c2-0a2e910038e5"
          : value;
      const requestDB = await Package.scope("public").findOne({
        attributes: ["id", "code", "name", "price", "longTime", "rupiah"],
        where: { id: value },
      });
      if (!requestDB) throw new Error("subscription plan tidak ditemukan");
      req.subscription = requestDB;
      return true;
    }),
];
module.exports = { service, validation };
