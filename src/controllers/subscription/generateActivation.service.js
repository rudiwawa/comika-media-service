const {
  Subscription,
  Sequelize: { Op },
} = require("../../models");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const generateActivation = async (userId, day = 0) => {
  const startDate = await getStartSubscribe(userId);
  const listActivation = [];
  for (let index = 0; index < day; index++) {
    listActivation.push({
      id: uuidv4(),
      userId,
      availableOn: moment(startDate).add(7, "hours").add(index, "days"),
    });
  }
  const requestDB = await Subscription.bulkCreate(listActivation);
  return requestDB;
};

const getStartSubscribe = async (userId) => {
  const lastDate = await Subscription.max("availableOn", {
    where: {
      userId,
      availableOn: {
        [Op.gte]: moment(),
      },
    },
  });

  return lastDate || moment().format("YYYY-MM-DD");
};

module.exports = generateActivation;