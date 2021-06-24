const { Jumbotron } = require("../../models");

const service = async function (req, res, next) {
  try {
    const requestDB = await Jumbotron.findAll({ order: [["sequence", "ASC"]] });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};
module.exports = { service };
