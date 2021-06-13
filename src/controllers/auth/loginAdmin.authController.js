const { User } = require("../../models");
const { compareSync } = require("bcrypt");
const { addJWT } = require("../../middlewares/jwt");
const service = async function (req, res, next) {
  if (!req.body.email || !req.body.password)
    req.response = {
      status: 400,
      msg: "email dan password tidak boleh kosong",
    };
  else {
    const requestDB = await User.scope("admin").findOne({
      where: { email: req.body.email },
    });
    if (requestDB) {
      const validUser = compareSync(req.body.password, requestDB.password);
      if (validUser) {
        req.response = { data: addJWT(requestDB) };
      } else {
        req.response = { status: 400, msg: "email dan password tidak valid" };
      }
    } else {
      req.response = { status: 404, msg: "email dan password tidak valid" };
    }
  }
  next();
};
module.exports = { service };
