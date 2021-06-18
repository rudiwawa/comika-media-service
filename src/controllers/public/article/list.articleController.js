const { Article } = require("../../../models");

const service = async function (req, res, next) {
  try {
    let limit = 5;
    const requestDB = await Article.findAll({
      limit,
      order: [["createdAt", "DESC"]],
    });
    if (req.query.id && !requestDB.length) {
      res.response = { status: 404, msg: "article not found" };
    } else res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
