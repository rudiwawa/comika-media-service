const axios = require("axios");
const service = async function (req, res, next) {
  try {
    const {
      data: { rajaongkir },
    } = await axios.get("https://api.rajaongkir.com/starter/province", {
      headers: { key: process.env.KEY_RAJA_ONGKIR },
    });
    if (rajaongkir.status.code == 200) {
      res.response = { data: rajaongkir.results };
    } else {
      res.response = { status: 400, msg: "gangguan response" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
