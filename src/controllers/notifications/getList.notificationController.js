const { Notification } = require("../../models");

const service = async function (req, res, next) {
  try {
    let attributes = ["id", "img", "title", "isRead", "createdAt"];
    let limit = 10;
    let offset = 0;
    let order = [];
    const where = { userId: req.auth.id };

    if (req.query.id) {
      where.id = req.query.id;
      attributes.push(["description_html", "description"]);
      Notification.update({ isRead: true }, { where });
    } else {
      attributes.push("description");
    }
    if (req.query.limit && req.query.limit > 0) {
      limit = Number(req.query.limit);
    }
    if (req.query.page && req.query.page > 0) {
      offset = Number(req.query.page - 1) * limit;
    }
    order.push(["updatedAt", "DESC"]);
    const requestDB = await Notification.findAll({
      attributes,
      where,
      order,
      limit,
      offset,
    });
    res.response = { data: req.query.id ? requestDB[0] : requestDB };
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
