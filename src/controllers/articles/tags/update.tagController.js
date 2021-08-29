const {
  Tag,
  Sequelize: { Op },
} = require("../../../models");
const { body } = require("express-validator");
const service = async function (req, res, next) {
  const payload = {
    name: req.body.name,
  };
  try {
    const requestDB = await Tag.update(payload, { where: { id: req.body.id } });
    res.response = { msg: `Tag ${payload.name} berhasil diubah`, data: requestDB };
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
  body("name").notEmpty().withMessage("nama tag tidak boleh kosong"),
  body().custom(async ({ id, name }) => {
    const tag = await Tag.findOne({
      where: { [Op.and]: [{ name }, { id: { [Op.ne]: id } }] },
    });
    if (tag) throw new Error("Nama tag sudah digunakan");
    return tag;
  }),
];

module.exports = { service, validation };
