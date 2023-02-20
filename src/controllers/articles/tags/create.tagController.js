const { Tag } = require("../../../models");
const { body } = require("express-validator");
const service = async function (req, res, next) {
  const payload = {
    name: req.body.name,
  };
  try {
    const requestDB = await Tag.create(payload);
    res.response = { msg: `Tag ${payload.name} berhasil ditambahkan`, data: requestDB };
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
    .withMessage("nama tag tidak boleh kosong")
    .custom(async (value) => {
      const tag = await Tag.findOne({ where: { name: value } });
      if (tag) throw new Error("Nama tag sudah digunakan");
      return tag;
    }),
];

module.exports = { service, validation };
