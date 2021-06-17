const jwt = require("jsonwebtoken");
const { JWT, Record } = require("../models");
const checkToken = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) return res.status(401).json({ msg: "Unauthorized." });
  jwt.verify(token, process.env.KEY, async (err, decode) => {
    if (err) {
      return res.status(400).json({ msg: "invalid token." });
    } else {
      const requestDB = await JWT.findOne({ where: { token } });
      if (requestDB.revoke) {
        req.record.status = 401;
        req.record.msg = "rejected";
        Record.create(req.record);
        return res.status(401).json({ msg: "rejected" });
      } else {
        req.record.userId = decode.user.id;
        req.auth = decode.user;
        next();
      }
    }
  });
};

const addJWT = (user) => {
  delete user.dataValues.password;
  const token = jwt.sign({ user }, process.env.KEY, { expiresIn: "1h" });
  const response = {
    // ...user.dataValues,
    token,
  };
  const payload = { userId: user.dataValues.id, token };
  JWT.create(payload);
  return response;
};

const checkTokenUser = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) return res.status(401).json({ msg: "Unauthorized." });
  jwt.verify(token, process.env.KEY_USER, (err, decode) => {
    if (err) return res.status(400).json({ msg: "invalid token." });
    else {
      req.record.userId = decode.user.id;
      req.auth = decode.user;
      next();
    }
  });
};

const addJWTUser = (user) => {
  delete user.dataValues.password;
  const token = jwt.sign({ user }, process.env.KEY_USER, { expiresIn: "1h" });
  const response = {
    // ...user.dataValues,
    token,
  };
  const payload = { userId: user.dataValues.id, token };
  JWT.create(payload);
  return response;
};

module.exports = { checkToken, addJWT, checkTokenUser, addJWTUser };
