const { city } = require("../../../services/rajaongkir.service");
const service = async function (req, res, next) {
  try {
    if (!req.query.province) throw new Error("parameter provinsi tidak boleh kosong");
    const data = await city({ province: req.query.province });
    const dataCity = data.map((item) => {
      return { province_id: item.province_id, city_id: item.city_id, city_name: item.city_name };
    });
    res.response = {
      data: dataCity,
    };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
