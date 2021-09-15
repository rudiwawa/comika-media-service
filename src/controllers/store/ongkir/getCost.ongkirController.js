const { body } = require("express-validator");
const { estimateCost } = require("../../../services/rajaongkir.service");
const service = async function (req, res, next) {
  try {
    const { body } = req;
    const payload = {
      weight: body.weight,
      destination: body.destination,
    };
    const data = await estimateCost(payload);
    res.response = data;
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const validation = [
  body("destination", "Lokasi tujuan tidak boleh kosong").notEmpty(),
  body("weight", "Lokasi tujuan tidak boleh kosong")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Berat tidak boleh dibawah 1 gram"),
];

module.exports = { service, validation };
