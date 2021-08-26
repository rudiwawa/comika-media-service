const { Source } = require("../../models");
const service = async function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "file tidak boleh kosong" });
    }
    const payload = {
      name: req.body.name,
      url: req.urlApps + req.file.path,
    };
    const requestDB = await Source.create(payload);
    res.response = { msg: `Source berhasil ditambahkan`, data: requestDB };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };
