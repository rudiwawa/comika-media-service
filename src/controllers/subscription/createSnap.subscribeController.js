const { body } = require("express-validator");
const { User, Product } = require("../../models");
const midtransSnapUi = require("./midtransSubscribe.service");
const sendEmail = require("../../services/sendEmail");
const sendNotification = require("../../services/sendNotification");

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
      const requestMidtrans = await midtransSnapUi({
        subscription: req.subscription.dataValues,
        user,
      });
      res.response = { msg: `${req.auth.name} membeli paket subscription`, data: requestMidtrans };
      const bodyNotif = bodyEmail(user.name, requestMidtrans.redirect_url);
      sendEmail({ to: user.email, subject: "PEMBELIAN MEMBER", body: bodyNotif });
      sendNotification.create(user.id, "PEMBELIAN MEMBER", bodyNotif);
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
      const requestDB = await Product.scope("subscription").findOne({
        attributes: ["id", "name", "price", ["capacity", "longTime"], "rupiah"],
        where: { id: value },
      });
      if (!requestDB) throw new Error("subscription plan tidak ditemukan");
      requestDB.dataValues.code = generateCode(requestDB.name);
      req.subscription = requestDB;
      return true;
    }),
];
const generateCode = (name) => {
  name = name.replace(/[^\w\s]/gi, " ");
  const arrName = name.split(/ /g);
  return arrName.map((item) => item.substring(0, 1)).join("");
};
module.exports = { service, validation };
