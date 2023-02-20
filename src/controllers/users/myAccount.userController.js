const {
  User,
  Subscription,
  Sequelize,
  Sequelize: { Op },
} = require("../../models");
const moment = require("moment");

const service = async function (req, res, next) {
  try {
    const requestDB = await User.findOne({
      attributes: {
        exclude: ["password", "secretId"],
        include: [
          [Sequelize.literal("(select if (count(Subscriptions.id)>0,true,false))"), "isPremium"],
          // [Sequelize.fn("COUNT", Sequelize.col("Subscriptions.id")), "premiumDay"],
          [Sequelize.fn("MAX", Sequelize.col("Subscriptions.available_on")), "lastPremiumDate"],
        ],
      },
      where: { id: req.auth.id },
      include: [
        {
          attributes: [],
          model: Subscription,
          required: false,
          where: {
            availableOn: {
              [Op.gte]: moment(),
            },
          },
        },
      ],
    });
    if (requestDB) {
      res.response = { data: requestDB };
    } else {
      res.response = { status: 404, msg: "user tidak ditemukan" };
    }
  } catch (error) {
    res.response = { status: 500, msg: error.message };
  }
  next();
};

module.exports = { service };
