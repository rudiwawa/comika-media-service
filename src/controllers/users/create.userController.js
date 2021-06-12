const { User } = require("../../models");
const sendEmail = require("../../services/sendEmail");

module.exports = async (req, res, next) => {
  const body = req.body;
  const payload = {
    name: body.name,
    email: body.email,
  };

  try {
    const requestDB = await User.create(payload);
    req.response = {
      msg: `data ${body.name} berhasil ditambahkan.`,
      data: requestDB,
    };
    sendEmail({ to: req.body.email });
  } catch (err) {
    req.response = { status: 500, msg: err.message };
  }
  next();
};
