const { Address } = require("../../../models");
const { body } = require("express-validator");
const { subdistrict } = require("../../../services/rajaongkir.service");
const service = async function (req, res, next) {
  try {
    const { auth, body } = req;
    const where = {
      id: req.body.id,
      userId: req.auth.id,
    };
    const location = await subdistrict({ id: req.body.subdistrictId });
    if (!location.subdistrict_id) throw new Error("data kota tidak sesuai");
    const payload = {
      userId: auth.id,
      name: body.name,
      address: body.address,
      provinceId: location.province_id,
      province: location.province,
      cityId: location.city_id,
      city: location.type + " " + location.city,
      subdistrictId: location.subdistrict_id,
      subdistrict: location.subdistrict_name,
      type: location.type,
      postalCode: body.postalCode,
      phone: body.phone,
      mark: body.mark,
    };
    const requestDB = await Address.update(payload, { where });
    res.response = { msg: `Alamat berhasil diperbarui`, data: payload };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

const validation = [
  body("id", "id tidak boleh kosong").notEmpty(),
  body("name", "nama tidak boleh kosong").notEmpty(),
  body("address", "Alamat lengkap tidak boleh kosong").notEmpty(),
  body("subdistrictId", "Data kecamatan tidak boleh kosong").notEmpty(),
  body("postalCode", "Kode pos tidak boleh kosong").notEmpty(),
  body("phone", "No. Telepon lengkap tidak boleh kosong").notEmpty(),
  body("mark", "tanda lokasi wajib diisi").notEmpty().isIn(["rumah", "kantor"]).withMessage("data lokasi tidak sesuai"),
];

module.exports = { service, validation };
