const {
  Subscription,
  Sequelize: { Op },
} = require("../../models");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const generateActivation = async (userId, day = 0, t) => {
  const startDate = await getStartSubscribe(userId);
  const listActivation = [];
  for (let index = 0; index < day; index++) {
    listActivation.push({
      id: uuidv4(),
      userId,
      availableOn: moment(startDate).add(index, "days"),
    });
  }
  const requestDB = await Subscription.bulkCreate(listActivation, { transaction: t });
  return requestDB;
};

const getStartSubscribe = async (userId) => {
  const lastDate = await Subscription.max("availableOn", {
    where: {
      userId,
      availableOn: {
        [Op.gte]: moment().add(7, "hours"),
      },
    },
  });

  return lastDate || moment().format("YYYY-MM-DD");
};

module.exports = generateActivation;
