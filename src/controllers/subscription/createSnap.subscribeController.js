const { body } = require("express-validator");
const { User, Package } = require("../../models");
const midtransSnapUi = require("./midtransSnap.service");

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
      res.response = { data: requestMidtrans };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
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

const validation = [
  body("package")
    .notEmpty()
    .withMessage("silahkan pilih subscription plan terlebih dahulu")
    .custom(async (value, { req }) => {
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
