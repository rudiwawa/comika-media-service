const { Address } = require("../../../models");
exports.getActive = async (userId) => {
  const request = await Address.findOne({ where: { userId, active: true } });
  if (!request) throw new Error("anda belum memiliki lokasi utama");
  return request;
};
