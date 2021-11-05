const { Notification } = require("../../models");

const service = async function (req, res, next) {
  try {
    let limit = 10;
    let offset = 0;
    let order = [];
    const where = { userId: req.auth.id, type: "informasi" };
    if (req.query.type) {
      where.type = req.query.type;
    }
    if (req.query.limit && req.query.limit > 0) {
      limit = Number(req.query.limit);
    }
    if (req.query.page && req.query.page > 0) {
      offset = Number(req.query.page - 1) * limit;
    }
    order.push(["updatedAt", "DESC"]);
    const requestDB = await Notification.findAll({
      attributes: ["id", "img", "title", "isRead", "createdAt", "type", "typeIcon", "description"],
      where,
      order,
      limit,
      offset,
    });
    res.response = { data: requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
