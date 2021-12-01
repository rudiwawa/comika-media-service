const { User } = require("../../models");
const { addJWT } = require("../../middlewares/jwtUser");
const { body } = require("express-validator");
const freeMembership = require("../../services/freeMembership");
const validation = [
  body("email", "invalid parameters").notEmpty(),
  body("secretId", "invalid parameters").notEmpty(),
  body("name", "invalid parameters").notEmpty(),
  body("photo", "invalid parameters").notEmpty(),
];

const service = async function (req, res, next) {
  try {
    const requestUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (requestUser) {
      const userData = requestUser.dataValues;
      if (!userData.secretId) {
        res.response = {
          status: 400,
          msg: "Email sudah digunakan sebagi akun comika media",
        };
      } else {
        if (userData.secretId == req.body.secretId) {
          req.record.userId = userData.id;
          res.response = { etc: addJWT(requestUser) };
        } else {
          res.response = {
            status: 404,
            msg: "tidak ada akun yang cocok.",
          };
        }
      }
    } else {
      const payload = {
        email: req.body.email,
        name: req.body.name,
        photo: req.body.photo,
        secretId: req.body.secretId,
      };
      const requestDB = await User.create(payload);
      freeMembership(requestDB.id, 30);
      res.response = {
        msg: "akun berhasil tercatat",
        data: requestDB,
        etc: addJWT(requestDB),
      };
    }
  } catch (err) {
    res.response = {
      status: 500,
      msg: err.message,
    };
  }
  next();
};
module.exports = { service, validation };
