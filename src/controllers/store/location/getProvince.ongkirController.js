const { province } = require("../../../services/rajaongkir.service");
const service = async function (req, res, next) {
  try {
    const data = await province({});
    return res.json(data);
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
