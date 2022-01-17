const { OrderDelivery } = require("../../../models");

const service = async (req, res, next) => {
  try {
    if (!req.body.noResi) return res.status(400).json({ msg: "noResi is required" });
    const requestDB = await OrderDelivery.update(
      { noResi: req.body.noResi, status: "sending" },
      { where: { id: req.params.id } }
    );
    res.response = { msg: `noResi berhasil diubah` };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
