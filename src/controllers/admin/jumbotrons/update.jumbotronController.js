const { Jumbotron } = require("../../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  const payload = {
    sequence: req.body.sequence,
    link: req.body.link,
    isPhone: req.body.isPhone,
    isDekstop: req.body.isDekstop,
  };
  if (req.file) {
    payload.img = req.file.path;
  }
  try {
    const requestDB = await Jumbotron.update(payload, {
      where: { id: req.body.id },
    });
    res.response = { msg: "jumbotron berhasil diperbarui" };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
const validation = [body("id", "id tidak boleh kosong").notEmpty()];

module.exports = { service, validation };
