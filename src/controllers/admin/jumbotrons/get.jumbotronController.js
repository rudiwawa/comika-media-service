const { Jumbotron } = require("../../../models");
const service = async function (req, res, next) {
  const where = {};
  if (req.params.id) {
    where.id = req.params.id;
  }
  try {
    const requestDB = await Jumbotron.findAll({
      where,
      order: [["sequence", "ASC"]],
    });
    if (req.params.id) {
      if (!requestDB.length)
        res.response = { status: 404, msg: "jumbotron tidak ditemukan" };
      else res.response = { data: requestDB[0] };
    } else res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
