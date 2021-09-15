const { subdistrict } = require("../../../services/rajaongkir.service");
const service = async function (req, res, next) {
  try {
    if (!req.query.city) throw new Error("parameter kota tidak boleh kosong");
    const data = await subdistrict({ city: req.query.city });
    const dataSubdistrict = data.map((item) => {
      return {
        subdistrict_id: item.subdistrict_id,
        subdistrict_name: item.subdistrict_name,
        city_id: item.city_id,
      };
    });
    res.response = {
      data: dataSubdistrict,
    };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
