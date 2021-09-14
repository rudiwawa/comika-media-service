const { Address } = require("../../../models");
const { body } = require("express-validator");
const { city } = require("./rajaongkir.service");
const service = async function (req, res, next) {
  try {
    const { auth, body } = req;
    const location = await city({ id: req.body.cityId });
    if (!location.city_id) throw new Error("data kota tidak sesuai");
    const payload = {
      userId: auth.id,
      name: body.name,
      address: body.address,
      provinceId: location.province_id,
      province: location.province,
      cityId: location.city_id,
      city: location.city_name,
      subdistrictId: null,
      subdistrict: null,
      type: location.type,
      postalCode: body.postalCode,
      phone: body.phone,
      mark: body.mark,
    };
    const requestDB = await Address.create(payload);
    res.response = { msg: `Alamat berhasil ditambahkan`, data: requestDB };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

const validation = [
  body("name", "nama tidak boleh kosong").notEmpty(),
  body("address", "Alamat lengkap tidak boleh kosong").notEmpty(),
  body("cityId", "Data Kota/Kabupaten tidak boleh kosong").notEmpty(),
  body("postalCode", "Kode pos tidak boleh kosong").notEmpty(),
  body("phone", "No. Telepon lengkap tidak boleh kosong").notEmpty(),
  body("mark", "tanda lokasi wajib diisi").notEmpty().isIn(["rumah", "kantor"]).withMessage("data lokasi tidak sesuai"),
];

module.exports = { service, validation };
