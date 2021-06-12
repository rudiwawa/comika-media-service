const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) return res.status(401).json({ msg: "Unauthorized." });
  jwt.verify(token, "shiftacademy", (err, decode) => {
    if (err) return res.status(400).json({ msg: "invalid token." });
    else {
      req.auth = decode.user;
      next();
    }
  });
};
