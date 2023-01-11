const { EmailSubscription } = require("../../../models");
const service = async function (req, res, next) {
  try {
    const where = {};
    const requestDB = await EmailSubscription.findAll({ where, order: [["createdAt", "desc"]] });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = {
      status: 500,
      msg: error.message,
    };
  }
  next();
};

module.exports = { service };
