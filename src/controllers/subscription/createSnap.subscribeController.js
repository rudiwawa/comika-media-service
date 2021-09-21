const { body } = require("express-validator");
const { User } = require("../../models");
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
      throw new Error("API UNDER MAINTENANCE");
      // const user=requestData
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
    .isIn(["weekly", "monthly", "yearly"])
    .withMessage("paket harus sesuai dengan yang tersedia"),
];
module.exports = { service, validation };
