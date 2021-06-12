const { User } = require("../../models");

module.exports = async function (req, res, next) {
  const body = req.body;
  const payload = {
    name: body.name,
    email: body.email,
  };
  try {
    const requestDB = await User.update(payload, {
      where: { id: req.params.id },
    });

    if (requestDB)
      req.response = {
        msg: `data ${body.name} berhasil diperbarui`,
      };
    else
      req.response = {
        status: 400,
        msg: `data ${body.name} gagal untuk diperbarui`,
      };
  } catch (err) {
    req.response = { status: 500, msg: err.message };
  }
  next();
};
