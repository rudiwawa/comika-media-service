const { User } = require("../../models");
const { compareSync } = require("bcrypt");
const { addJWT } = require("../../middlewares/jwtUser");

const service = async function (req, res, next) {
  if (!req.body.email || !req.body.password)
    res.response = {
      status: 400,
      msg: "email dan password tidak boleh kosong",
    };
  else {
    const requestDB = await User.findOne({
      where: { email: req.body.email },
      attributes: ["id", "name", "password", "role"],
    });
    if (requestDB) {
      const validUser = compareSync(req.body.password, requestDB.password);
      if (validUser) {
        req.record.userId = requestDB.dataValues.id;
        res.response = { etc: addJWT(requestDB) };
      } else {
        res.response = { status: 400, msg: "email dan password tidak valid" };
      }
    } else {
      res.response = { status: 404, msg: "email dan password tidak valid" };
    }
  }
  next();
};
module.exports = { service };
