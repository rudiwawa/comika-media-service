const { Address } = require("../../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  try {
    const { auth, body } = req;
    const where = {
      id: req.body.id,
      userId: req.auth.id,
    };
    const payload = {
      userId: auth.id,
      name: body.name,
      address: body.address,
      provinceId: body.provinceId,
      province: body.province,
      cityId: body.cityId,
      city: body.city,
      subdistrictId: body.subdistrictId,
      subdistrict: body.subdistrict,
      type: body.type,
      postalCode: body.postalCode,
      phone: body.phone,
    };
    const requestDB = await Address.update(payload, { where });
    res.response = { msg: `Alamat berhasil diperbarui` };
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
  body("provinceId", "Data Provinsi tidak boleh kosong").notEmpty(),
  body("province", "Provinsi tidak boleh kosong").notEmpty(),
  body("cityId", "Data Kota/Kabupaten tidak boleh kosong").notEmpty(),
  body("city", "Kota/Kabupaten tidak boleh kosong").notEmpty(),
  // body("subdistrictId", "alamat lengkap tidak boleh kosong").notEmpty(),
  // body("subdistrict", "alamat lengkap tidak boleh kosong").notEmpty(),
  // body("type", "type tidak boleh kosong").notEmpty(),
  body("postalCode", "Kode pos tidak boleh kosong").notEmpty(),
  body("phone", "No. Telepon lengkap tidak boleh kosong").notEmpty(),
];

module.exports = { service, validation };
