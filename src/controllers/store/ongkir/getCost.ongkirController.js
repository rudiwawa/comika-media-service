const axios = require("axios");
const { body } = require("express-validator");
const { setRupiah } = require("../../../helpers/currency");
const service = async function (req, res, next) {
  try {
    const { body } = req;
    const payload = {
      origin: body.origin,
      destination: body.destination,
      weight: body.weight,
      courier: body.courier,
    };
    const {
      data: { rajaongkir },
    } = await axios.post(`https://api.rajaongkir.com/starter/cost`, payload, {
      headers: { key: process.env.KEY_RAJA_ONGKIR },
    });
    if (rajaongkir.status.code == 200) {
      res.response = { data: formatResponse(rajaongkir.results[0]) };
    } else {
      res.response = { status: 400, msg: "gangguan response" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

const formatResponse = (response) => {
  return response.costs.map((item) => {
    return {
      service: item.service,
      description: item.description,
      cost: item.cost[0].value,
      rupiah: setRupiah(item.cost[0].value),
      estDay: item.cost[0].etd,
      note: item.cost[0].note,
      
    };
  });
};

const validation = [
  body("origin", "Lokasi asal tidak boleh kosong").notEmpty(),
  body("destination", "Lokasi tujuan tidak boleh kosong").notEmpty(),
  body("weight", "Lokasi tujuan tidak boleh kosong")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Berat tidak boleh dibawah 1 gram"),
  body("courier", "Expedisi tidak boleh kosong").isIn(["jne", "pos", "tiki"]).withMessage("Ekspedisi tidak sesuai"),
];

module.exports = { service, validation };
