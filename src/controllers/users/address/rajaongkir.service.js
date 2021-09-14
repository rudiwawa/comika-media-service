const axios = require("axios");
exports.province = async ({ id }) => {
  try {
    const where = {};
    if (id) where.id = id;
    const {
      data: { rajaongkir },
    } = await axios.get(`https://api.rajaongkir.com/starter/province`, {
      headers: { key: process.env.KEY_RAJA_ONGKIR },
      params: where,
    });
    return rajaongkir.results;
  } catch (error) {
    return error.message;
  }
};

exports.city = async ({ id, provinceId }) => {
  try {
    const where = {};
    if (id) where.id = id;
    if (provinceId) where.province = provinceId;
    const {
      data: { rajaongkir },
    } = await axios.get(`https://api.rajaongkir.com/starter/city`, {
      headers: { key: process.env.KEY_RAJA_ONGKIR },
      params: where,
    });
    return rajaongkir.results;
  } catch (error) {
    return error.message;
  }
};

exports.subdistrict = async ({ id, cityId }) => {
  try {
    const where = {};
    if (cityId) where.id = cityId;
    if (id) where.id = id;
    const {
      data: { rajaongkir },
    } = await axios.get(`https://api.rajaongkir.com/starter/subdistrict`, {
      headers: { key: process.env.KEY_RAJA_ONGKIR },
      params: where,
    });
    return rajaongkir.results;
  } catch (error) {
    return error.message;
  }
};
