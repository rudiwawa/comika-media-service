const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) return res.status(401).json({ msg: "Unauthorized." });
  jwt.verify(token, process.env.KEY, (err, decode) => {
    if (err) return res.status(400).json({ msg: "invalid token." });
    else {
      req.auth = decode.user;
      next();
    }
  });
};

const addJWT = (user) => {
  delete user.dataValues.password;
  const response = {
    ...user.dataValues,
    token: jwt.sign({ user }, process.env.KEY, { expiresIn: "1h" }),
  };
  return response;
};

const checkTokenUser = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) return res.status(401).json({ msg: "Unauthorized." });
  jwt.verify(token, process.env.KEY_USER, (err, decode) => {
    if (err) return res.status(400).json({ msg: "invalid token." });
    else {
      req.auth = decode.user;
      next();
    }
  });
};

const addJWTUser = (user) => {
  delete user.dataValues.password;
  const response = {
    ...user.dataValues,
    token: jwt.sign({ user }, process.env.KEY_USER, { expiresIn: "1h" }),
  };
  return response;
};

module.exports = { checkToken, addJWT, checkTokenUser, addJWTUser };
