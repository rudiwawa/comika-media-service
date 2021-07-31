const { Subscription, Sequelize } = require("../../models");
const moment = require("moment");
const { Op } = Sequelize;
const service = async function (req, res, next) {
  try {
    const request = await Subscription.findAll({
      attributes: [
        ["available_on", "date"],
        [Sequelize.fn("COUNT", Sequelize.col("user_id")), "active"],
      ],
      where: {
        availableOn: {
          [Op.gte]: moment("01", "DD").toDate(),
          [Op.lt]: moment("01", "DD").add(1, "months").toDate(),
        },
      },
      group: "available_on",
    });
    return res.json(request);
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
