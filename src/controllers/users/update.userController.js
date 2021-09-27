const {
  User,
  Address,
  Sequelize: { Op },
} = require("../../models");
const { subdistrict } = require("../../services/rajaongkir.service");
const { body } = require("express-validator");

const service = async function (req, res, next) {
  try {
    const body = req.body;
    let payload = {
      userId: req.auth.id,
      name: body.name,
      email: body.email,
      phone: body.phone,
      birthdate: body.birthdate,
      address: body.address,
      postalCode: body.postalCode,
      role: body.role,
    };
    if (body.subdistrictId) {
      const location = await subdistrict({ id: body.subdistrictId });
      if (!location.subdistrict_id) throw new Error("data kota tidak sesuai");
      const address = locationToAddress(location);
      payload = { ...payload, ...address };
      checkAddress(payload);
    }
    if (req.file) payload.photo = req.urlApps + req.file.path;
    const requestDB = await User.update(payload, {
      where: { id: body.id },
    });
    if (requestDB[0]) {
      res.response = {
        msg: `data ${body.name} berhasil diperbarui`,
        data: payload,
      };
    } else {
      res.response = {
        status: 400,
        msg: `data ${body.name} gagal untuk diperbarui`,
      };
    }
  } catch (err) {
    res.response = { status: 500, msg: err.message };
  }
  next();
};

const locationToAddress = (location) => {
  return {
    provinceId: location.province_id,
    province: location.province,
    cityId: location.city_id,
    city: location.type + " " + location.city,
    subdistrictId: location.subdistrict_id,
    subdistrict: location.subdistrict_name,
    type: location.type,
  };
};

const checkAddress = async (payload) => {
  const where = { userId: payload.userId };
  const { count, rows } = await Address.findAndCountAll({ where });
  if (count < 1) {
    payload.active = true;
    payload.mark = "Rumah";
    Address.create(payload);
  }
};

const validation = [
  body("id").notEmpty().withMessage("id tidak boleh kosong").trim().escape(),
  body("name").notEmpty().withMessage("name tidak boleh kosong").trim().escape(),
  body("phone").isLength({ max: 13 }).withMessage("nomor telepon maksimal 13 karakter").trim().escape(),
  body("postalCode").isLength({ max: 5 }).withMessage("kode pos tidak boleh lebih 5 karakter").trim().escape(),
  body("email").notEmpty().withMessage("email tida boleh kosong").isEmail().withMessage("email tidak valid").trim().escape(),
  body().custom(({ id, email }) => {
    return User.findAll({
      where: { [Op.and]: [{ email }, { id: { [Op.ne]: id } }] },
    }).then((user) => {
      if (user.length) {
        return Promise.reject("email sudah digunakan");
      }
      return true;
    });
  }).trim().escape(),
];
module.exports = { service, validation };
