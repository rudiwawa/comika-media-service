const { JWT, Record, User } = require("../../models");
const jwt = require("jsonwebtoken");
const { addJWT } = require("../../middlewares/jwtAdmin");

const service = async function (req, res, next) {
  const token = req.get("Authorization");
  if (!token) return res.status(401).json({ msg: "Unauthorized." });
  jwt.verify(token, process.env.KEY, async (err, decode) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    } else {
      req.record.userId = decode.user.id;
      const requestDB = await JWT.findOne({ where: { token } });
      if (requestDB.revoke) {
        req.record.status = 401;
        req.record.msg = "refresh rejected";
        Record.create(req.record);
        return res.status(401).json({ msg: "refresh rejected" });
      } else {
        JWT.update({ revoke: true }, { where: { token } });
        const user = await User.findOne({
          attributes: ["id", "name", "role"],
          where: { id: decode.user.id },
        });
        res.response = { data: addJWT({ dataValues: user }) };
        next();
      }
    }
  });
};
module.exports = { service };
