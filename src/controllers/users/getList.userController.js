const { User } = require("../../models");

const service = async function (req, res, next) {
  try {
    let attributes = ["id", "name", "email", "phone", "birthdate"];
    if (req.params.id) {
      attributes = [...attributes, "photo", "address", "postalCode", "province", "city", "subdistrict"];
    }
    const requestDB = await User.findAll({
      attributes,
      where: { role: "user" },
    });
    if (req.params.id) {
      if (requestDB) {
        res.response = { data: requestDB[0] };
      } else {
        res.response = { status: 404, msg: "user tidak ditemukan" };
      }
    } else res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
