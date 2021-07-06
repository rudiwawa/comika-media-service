const { Comika } = require("../../models");
const { body, check } = require("express-validator");
const service = async function (req, res, next) {
  const payload = {
    name: req.body.name,
    verified: req.body.verified,
  };
  if (req.file) payload.photo = req.urlApps + req.file.path;
  try {
    const requestDB = await Comika.create(payload);
    res.response = { msg: `Comika ${payload.name} berhasil ditambahkan`, data: requestDB };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

const validation = [
  body("name")
    .notEmpty()
    .withMessage("nama comika tidak boleh kosong")
    .custom(async (value) => {
      const comika = await Comika.findOne({ where: { name: value } });
      if (comika) throw new Error("Nama comika sudah digunakan");
      return comika;
    }),
];

module.exports = { service, validation };
