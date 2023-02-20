const { Subscription, Sequelize } = require("../../models");
const moment = require("moment");
const { Op } = Sequelize;
const service = async function (req, res, next) {
  let start = moment("01", "DD").toDate();
  let end = moment("01", "DD").add(1, "months").toDate();
  if (req.query.start && req.query.end) {
    start = moment(req.query.start, "YYYY-MM-DD").toDate();
    end = moment(req.query.end, "YYYY-MM-DD").toDate();
  }
  try {
    const request = await Subscription.findAll({
      attributes: [
        ["available_on", "date"],
        [Sequelize.fn("COUNT", Sequelize.col("user_id")), "active"],
      ],
      where: {
        availableOn: {
          [Op.gte]: start,
          [Op.lt]: end,
        },
      },
      group: "available_on",
      order: [["available_on", "ASC"]],
    });
    return res.json(request);
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
