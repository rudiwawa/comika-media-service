const {
  Source,
  Sequelize: { Op },
} = require("../../models");
const service = async function (req, res, next) {
  const payload = {
    name: req.body.name,
  };
  if (req.file) payload.photo = req.urlApps + req.file.path;
  try {
    const requestDB = await Source.update(payload, { where: { id: req.body.id } });
    res.response = { msg: `Source berhasil diubah`, data: requestDB };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };
