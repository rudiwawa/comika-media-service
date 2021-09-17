const { Address } = require("../../../models");
exports.getActive = async (userId) => {
  try {
    const request = await Address.findOne({ where: { userId, active: true } });
    if (!request) throw new Error("anda belum memiliki lokasi utama");
    return request;
  } catch (error) {
    throw new Error(error.message);
  }
};
