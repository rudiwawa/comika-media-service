const jwt = require("jsonwebtoken");
const { JWT, Record } = require("../models");

const checkToken = (req, res, next) => {
  const token = req.get("Authorization");
  // return res.json({ token });
  if (!token) return res.status(401).json({ msg: "Unauthorized." });
  jwt.verify(token, process.env.KEY_USER, async (err, decode) => {
    if (err) {
      if (err.message === "jwt malformed") {
        return res.status(403).json({ msg: err.message });
      }
      return res.status(401).json({ msg: err.message });
    } else {
      try {
        const requestDB = await JWT.findOne({ where: { token } });
        if (!requestDB) {
          req.record.status = 401;
          req.record.msg = "Unauthorized";
          Record.create(req.record);
          return res.status(401).json({ msg: "Unauthorized." });
        }
        if (requestDB.revoke) {
          req.record.status = 401;
          req.record.msg = "rejected";
          Record.create(req.record);
          return res.status(401).json({ msg: "rejected" });
        } else {
          req.record.userId = decode.user.id;
          req.record.name = decode.user.name;
          req.record.email = decode.user.email;
          req.auth = decode.user;
          next();
        }
      } catch (error) {
        req.record.status = 500;
        req.record.msg = error.message;
        Record.create(req.record);
        return res.status(500).json({ msg: error.message });
      }
    }
  });
};

const ifHasToken = (req, res, next) => {
  const token = req.get("Authorization");
  if (token) {
    jwt.verify(token, process.env.KEY_USER, (err, decode) => {
      if (!err) {
        req.record.userId = decode.user.id;
        req.record.name = decode.user.name;
        req.record.email = decode.user.email;
        req.auth = decode.user;
      }
    });
  }
  next();
};
const addJWT = (user) => {
  delete user.dataValues.password;
  delete user.dataValues.secretId;
  const token = jwt.sign({ user: user.dataValues }, process.env.KEY_USER, {
    expiresIn: "24h",
  });
  const response = {
    // ...user.dataValues,
    token,
  };
  const payload = { userId: user.dataValues.id, token };
  JWT.create(payload);
  return response;
};

module.exports = { checkToken, addJWT, ifHasToken };
