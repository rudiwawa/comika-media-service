const {
  Comika,
  Sequelize: { Op },
} = require("../../models");
const { body, check } = require("express-validator");
const service = async function (req, res, next) {
  const payload = {
    name: req.body.name,
    verified: req.body.verified,
  };
  if (req.file) payload.photo = req.urlApps + req.file.path;
  try {
    const requestDB = await Comika.update(payload, { where: { id: req.body.id } });
    res.response = { msg: `Comika ${payload.name} berhasil diubah`, data: requestDB };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

const validation = [
  body("id").notEmpty().withMessage("id tidak boleh kosong"),
  body("name").notEmpty().withMessage("nama comika tidak boleh kosong"),
  body().custom(async ({ id, name }) => {
    const comika = await Comika.findOne({
      where: { [Op.and]: [{ name }, { id: { [Op.ne]: id } }] },
    });
    if (comika) throw new Error("Nama comika sudah digunakan");
    return comika;
  }),
];

module.exports = { service, validation };
